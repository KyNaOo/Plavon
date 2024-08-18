import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PlavonService } from './plavon.service';
import { CreatePlavonDto } from './dto/create-plavon.dto';
import { UpdatePlavonDto } from './dto/update-plavon.dto';

@Controller('plavon')
export class PlavonController {
  constructor(private readonly plavonService: PlavonService) {}

  @Post()
  create(@Body() createPlavonDto: CreatePlavonDto) {
    return this.plavonService.create(createPlavonDto);
  }

  @Get()
  findAll() {
    return this.plavonService.findAll();
  }

  @Get(':id')
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
}
