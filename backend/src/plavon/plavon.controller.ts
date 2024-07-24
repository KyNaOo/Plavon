import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { PlavonService } from './plavon.service';
import { CreatePlavonDto } from './dto/create-plavon.dto';
import { UpdatePlavonDto } from './dto/update-plavon.dto';
import { AddParticipantDto } from './dto/add-participant.dto';

@Controller('plavon')
export class PlavonController {
  constructor(private readonly plavonService: PlavonService) {}

  @Post()
  async create(@Body() createPlavonDto: CreatePlavonDto) {
    return await this.plavonService.create(createPlavonDto);
  }

  @Get()
  async findAll() {
    return await this.plavonService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.plavonService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: UpdatePlavonDto) {
    return await this.plavonService.update(id, data);
  }

  @Put(':id/participants')
  async addParticipant(
    @Param('id') id: string,
    @Body() data: AddParticipantDto,
  ) {
    return await this.plavonService.addParticipant(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.plavonService.remove(id);
  }
}
