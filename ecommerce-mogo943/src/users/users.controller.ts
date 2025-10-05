import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Query, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/guards/Auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @HttpCode(200)
  @Get()
  findAll( @Query('page') page?: string, @Query('limit') limit?: string ) {
    if(page && limit){
      return this.usersService.findAll(+page, +limit);
    }
    return this.usersService.findAll();
  }

  @UseGuards(AuthGuard)
  @HttpCode(200)
  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.usersService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @HttpCode(200)
  @Patch(':id')
  update(@Param('id', new ParseUUIDPipe()) id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @UseGuards(AuthGuard)
  @HttpCode(200)
  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.usersService.remove(id);
  }
}
