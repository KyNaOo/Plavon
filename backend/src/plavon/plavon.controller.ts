import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PlavonService } from './plavon.service';
import { CreatePlavonDto } from './dto/create-plavon.dto';
import { UpdatePlavonDto } from './dto/update-plavon.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('plavon')
export class PlavonController {
  constructor(private readonly plavonService: PlavonService) {}

  @Post()
  create(@Body() createPlavonDto: CreatePlavonDto) {
    return this.plavonService.create(createPlavonDto);
  }

  @Get()
  findAll() {
    // return this.plavonService.findAll();
    return new Date();
  }

  @Get(':month')
  findAllByMonth(@Param('month') month: number) {
    return this.plavonService.findAllByMonth(month);
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
