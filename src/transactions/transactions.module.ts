import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { ProxyModule } from '../shared/proxy/proxy.module';

@Module({
  controllers: [TransactionsController],
  providers: [],
  imports: [
    ProxyModule
  ]
})
export class TransactionsModule {}
