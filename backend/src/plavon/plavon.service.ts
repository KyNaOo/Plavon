import { Injectable } from '@nestjs/common';
import { CreatePlavonDto } from './dto/create-plavon.dto';
import { UpdatePlavonDto } from './dto/update-plavon.dto';

@Injectable()
export class PlavonService {
  create(createPlavonDto: CreatePlavonDto) {
    return 'This action adds a new plavon';
  }

  findAll() {
    return `This action returns all plavon`;
  }

  findOne(id: number) {
    return `This action returns a #${id} plavon`;
  }

  update(id: number, updatePlavonDto: UpdatePlavonDto) {
    return `This action updates a #${id} plavon`;
  }

  remove(id: number) {
    return `This action removes a #${id} plavon`;
  }
}
