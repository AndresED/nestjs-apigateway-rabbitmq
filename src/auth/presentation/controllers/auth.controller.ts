import { Controller, Post, Body} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from '../../application/services/auth.service';
import { AuthLoginDto } from '../../application/dto/auth.dto';
import { ResponseBadRequestError, ResponseError500 } from '../../../shared/dtos/responses.dto';
import { ResponseAuthLoginDto } from '../../../auth/application/dto/response-auth.dto';

@Controller('auth')
@ApiTags('Auth')
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
export class AuthController {
    constructor(private readonly nameService: AuthService) { }
    // Login de un usuario
    @Post()
    @ApiResponse({
        type: ResponseAuthLoginDto,
        status: 201,
        description: 'Respuesta exitosa',
    })
    @ApiOperation({ summary: 'Permite realizar el login de un usuario del sistema.' })
    async auth(@Body() body: AuthLoginDto) {
        return await this.nameService.auth(body.email, body.password);
    }
}