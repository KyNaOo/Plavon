import { ConflictException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto } from '../user/dto/login.dto';
import { encodePassword } from '../utils/hashService';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async signIn(loginDto: LoginDto): Promise<{ access_token: string }> {
    const user = await this.userService.findOneByEmail(loginDto.email);
    if (user === null) {
      throw new ConflictException(['Email ou mot de passe invalide !']);
    }
    if (!bcrypt.compareSync(loginDto.password, user?.password)) {
      throw new ConflictException(['Email ou mot de passe invalide !']);
    }
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(createUserDto: CreateUserDto) {
    try {
      const userAlreadyExist = await this.userService.findOneByEmail(
        createUserDto.email,
      );

      if (userAlreadyExist) {
        throw new ConflictException('This email is already in use');
      }

      const hashedPassword = encodePassword(createUserDto.password);
      const user = this.userRepository.create({
        ...createUserDto,
        password: hashedPassword,
      });
      await this.userRepository.save(user);
      const payload = { sub: user.id, email: user.email };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      return {
        error: error,
      };
    }
  }
}
