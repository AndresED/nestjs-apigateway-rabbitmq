import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { ProxyModule } from '../shared/proxy/proxy.module';

@Module({
  controllers: [UsersController],
  providers: [],
  imports: [
    ProxyModule
  ]
})
export class UsersModule {}
