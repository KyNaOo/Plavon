import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { PlavonService } from './plavon.service';
import { CreatePlavonDto } from './dto/create-plavon.dto';
import { UpdatePlavonDto } from './dto/update-plavon.dto';
import { AuthGuard } from '../auth/auth.guard';
import { jwtDecode } from 'jwt-decode';
import { Request } from 'express';

@Controller('plavon')
export class PlavonController {
  private readonly logger = new Logger(PlavonController.name);
  constructor(private readonly plavonService: PlavonService) {}

  @Post()
  create(@Body() createPlavonDto: CreatePlavonDto) {
    return this.plavonService.create(createPlavonDto);
  }

  @Get()
  findAll() {
    console.log('test');
    return this.plavonService.findAll();
  }

  @Get('/id/:id')
  findOne(@Param('id') id: string) {
    return this.plavonService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlavonDto: UpdatePlavonDto) {
    return this.plavonService.update(id, updatePlavonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.plavonService.remove(id);
  }

  @Get('/today/')
  @UseGuards(AuthGuard)
  async findPlavonForToday(@Req() req: Request) {
    try {
      let token: string | undefined;
      let userId: string | undefined;

      if (req.headers.authorization) {
        token = req.headers.authorization.replace('Bearer ', '');
        try {
          const decoded = jwtDecode(token);
          userId = decoded.sub;
        } catch (error) {
          throw new UnauthorizedException('Token invalide');
        }
      }

      if (!userId) {
        throw new UnauthorizedException('Utilisateur non authentifié');
      }

      const plavons = await this.plavonService.findPlavonsForToday(userId);

      if (plavons.length === 0) {
        return { message: "Aucun Plavon trouvé pour aujourd'hui", plavons: [] };
      }

      return { plavons };
    } catch (error) {
      console.error('Erreur lors de la recherche des Plavons:', error);
      throw error;
    }
  }
}
