import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getEnvFilePath } from 'config/enviroments';
import { ScheduleModule } from '@nestjs/schedule';
import { SendGridModule } from '@ntegral/nestjs-sendgrid';
import { SharedModule } from './shared/shared.module';
import { UsersModule } from './users/users.module';
import { TransactionsModule } from './transactions/transactions.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: getEnvFilePath()
    }),
    HttpModule,
    ScheduleModule.forRoot(),
    SendGridModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        apiKey: config.get<string>('SENGRIDAPIKEY'),
      }),
    }),
    SharedModule,
    AuthModule,
    UsersModule,
    TransactionsModule,
  ],
  providers: [],
})
export class AppModule {}
