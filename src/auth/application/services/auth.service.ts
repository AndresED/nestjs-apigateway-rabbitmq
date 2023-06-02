import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { IAuthService } from '../../domain/interfaces/auth.service.interface';
import { ClientProxyCrediPremium } from '../../../shared/proxy/client.proxy';
import { UserMSG } from '../../../shared/proxy/constants';
import { UserStatusEnum } from 'src/shared/enum/user-status.enum';
import { IUsers } from '../../domain/interfaces/users.interface';
@Injectable()
export class AuthService implements IAuthService {
    private clientProxyUsers;
    constructor(
        private clientProxy: ClientProxyCrediPremium,
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
    ) {
        this.clientProxyUsers = this.clientProxy.clientProxyUsers();
    }
    // LOGIN
    async auth(email: string, password: string): Promise<{ accessToken: string; }> {
        return new Promise(async (resolve, reject) => {
            try {
                const users = await this.clientProxyUsers.send(UserMSG.FIND_ONE_BY_EMAIL, email).toPromise();
                console.log('users', users);
                if (!users) {
                    throw new HttpException({ message: 'email_not_found' }, HttpStatus.UNPROCESSABLE_ENTITY);
                }
                if (!bcrypt.compareSync(password, users.password)) {
                    throw new HttpException({ message: 'password_incorrect' }, HttpStatus.UNPROCESSABLE_ENTITY);
                }
                if (users.status === UserStatusEnum.UNACTIVE) {
                    throw new HttpException({ message: 'user_disable' }, HttpStatus.UNPROCESSABLE_ENTITY);
                }
                const token = await this.createTokenUsers(users);
                resolve({
                    accessToken: token,
                });
            } catch (error) {
                Logger.error(error);
                reject(error);
            }
        });
    }
    // CREACIÓN DEL TOKEN DE SESIÓN
    async createTokenUsers(payload: IUsers): Promise<string> {
        try {
            const dataPayload = {
                id: payload.id,
                name: payload.name,
                email: payload.email,
            }
            const options = {
                secret: this.configService.get('JWT_SECRET'),
            }
            const accessToken = await this.jwtService.sign(dataPayload, options);
            return accessToken;
        } catch (error) {
            Logger.error(error);
            return error;
        }
    }
}
