import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './application/services/auth.service';
import { AuthController } from './presentation/controllers/auth.controller';
import { SharedModule } from 'src/shared/shared.module';
import { ProxyModule } from 'src/shared/proxy/proxy.module';

@Module({
    controllers: [AuthController],
    imports: [
        SharedModule,
        ProxyModule,
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                secret: config.get<string>('JWT_SECRET'),
                signOptions: {
                    expiresIn: config.get<string>('EXPIRESIN'),
                },
            }),
        }),
        PassportModule.registerAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                defaultStrategy: config.get<string>('DEFAULTSTRATEGY'),
            }),
        }),
        UsersModule
    ],
    providers: [
        AuthService
    ]
})
export class AuthModule { }
