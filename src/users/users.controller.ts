import { Controller, Post, Body, Get, Query, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { CreateUserDto, ResponseCreateUsersDto, ResponseDeleteUserDto, ResponseDetailUsersDto, ResponseListAddressDto, ValidateUsersFiltersPipeDto } from './dto/create-user.dto';
import { ClientProxyCrediPremium } from '../shared/proxy/client.proxy';
import { Observable } from 'rxjs';
import { IListUsers, IUser } from '../shared/interfaces/users.interface';
import { UserMSG } from '../shared/proxy/constants';
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ResponseBadRequestError, ResponseError500, ResponseUnauthorizedAndRoleDto } from '../shared/dtos/responses.dto';
import { ValidateUsersFiltersPipe } from './pipes/users.pipe';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRoleEnum } from '../shared/enum/user-role.enum';
import { Roles } from '../auth/infraestructure/decorators/roles.decorator';
import { RolesGuard } from '../auth/presentation/guards/roles.guard';
import { AuthGuard } from '@nestjs/passport';
@ApiTags('Users')
@Controller('users')
@ApiResponse({
  type: ResponseBadRequestError,
  status: 400,
  description:
    'Errores relacionados a las validaciones de la información enviada al api',
})
@ApiResponse({
  type: ResponseError500,
  status: 500,
  description: 'Error inesperado en el servidor',
})
export class UsersController {
  private clientProxyUsers;
  constructor(
    private clientProxy: ClientProxyCrediPremium,
  ) {
    this.clientProxyUsers = this.clientProxy.clientProxyUsers();
  }
  @Post('user')
  @ApiOperation({ summary: 'Creación de un usuario con rol user'})
  @ApiResponse({
    type: ResponseCreateUsersDto,
    status: 201,
    description: 'Respuesta exitosa',
  })
  createAdmin(@Body() createUserDto: CreateUserDto): Observable<IUser> {
    createUserDto.role = UserRoleEnum.USER;
    console.log('createUserDto',createUserDto);
    return this.clientProxyUsers.send(UserMSG.CREATE_ADMIN, createUserDto);
  }
  @Post('admin')
  @ApiBearerAuth('access-token') // Protecctión de recurso mediante autenticación para swagger
  @ApiHeader({ name: 'Authorization', required: true })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRoleEnum.ADMINISTRATOR)
  @ApiOperation({ summary: 'Creación de un usuario con rol user'})
  @ApiResponse({
    type: ResponseCreateUsersDto,
    status: 201,
    description: 'Respuesta exitosa',
  })
  create(@Body() createUserDto: CreateUserDto): Observable<IUser> {
    createUserDto.role = UserRoleEnum.ADMINISTRATOR;
    return this.clientProxyUsers.send(UserMSG.CREATE, createUserDto);
  }
  @Get()
  @ApiBearerAuth('access-token') // Protecctión de recurso mediante autenticación para swagger
  @ApiHeader({ name: 'Authorization', required: true })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRoleEnum.ADMINISTRATOR, UserRoleEnum.USER)
  @ApiResponse({
    type: ResponseListAddressDto,
    status: 200,
    description: 'Respuesta exitosa',
  })
  @ApiUnauthorizedResponse({
    description: 'Requiere autenticación y rol de administrador o usuario',
    type: ResponseUnauthorizedAndRoleDto,
  })
  @ApiOperation({ summary: 'Listado de usuarios con rol user'})
  findAll(@Query(new ValidateUsersFiltersPipe()) query: ValidateUsersFiltersPipeDto): Observable<IListUsers> {
    console.log('query =>' ,query);
    return this.clientProxyUsers.send(UserMSG.FIND_ALL, query);
  }
  @Get(':id')
  @ApiBearerAuth('access-token') // Protecctión de recurso mediante autenticación para swagger
  @ApiHeader({ name: 'Authorization', required: true })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRoleEnum.ADMINISTRATOR, UserRoleEnum.USER)
  @ApiResponse({
    type: ResponseDetailUsersDto,
    status: 200,
    description: 'Respuesta exitosa',
  })
  @ApiUnauthorizedResponse({
    description: 'Requiere autenticación y rol de administrador o usuario',
    type: ResponseUnauthorizedAndRoleDto,
  })
  @ApiOperation({ summary: 'Detalle de un usuario'})
  findOne(@Param('id') id: string): Observable<IUser> {
    return this.clientProxyUsers.send(UserMSG.FIND_ONE, id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un usuario'})
  @ApiBearerAuth('access-token') // Protecctión de recurso mediante autenticación para swagger
  @ApiHeader({ name: 'Authorization', required: true })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRoleEnum.ADMINISTRATOR, UserRoleEnum.USER)
  @ApiResponse({
    type: ResponseDetailUsersDto,
    status: 201,
    description: 'Respuesta exitosa',
  })
  @ApiUnauthorizedResponse({
    description: 'Requiere autenticación y rol de administrador o usuario',
    type: ResponseUnauthorizedAndRoleDto,
  })

  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.clientProxyUsers.send(UserMSG.UPDATE, {id, updateUserDto});
  }
  @Delete(':id')
  @ApiBearerAuth('access-token') // Protecctión de recurso mediante autenticación para swagger
  @ApiHeader({ name: 'Authorization', required: true })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRoleEnum.ADMINISTRATOR, UserRoleEnum.USER)
  @ApiResponse({
    type: ResponseDeleteUserDto,
    status: 201,
    description: 'Respuesta exitosa',
  })
  @ApiUnauthorizedResponse({
    description: 'Requiere autenticación y rol de administrador o usuario',
    type: ResponseUnauthorizedAndRoleDto,
  })
  @ApiOperation({ summary: 'Borrar un usuario'})
  remove(@Param('id') id: string) {
    return this.clientProxyUsers.send(UserMSG.DELETE, id);
  }
}
