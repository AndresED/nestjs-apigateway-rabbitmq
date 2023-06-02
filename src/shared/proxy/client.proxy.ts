import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ClientProxy, ClientProxyFactory, Transport } from "@nestjs/microservices";
import { RabbitMQ } from "./constants";

@Injectable()
export class ClientProxyCrediPremium {
    constructor(
        private readonly configService: ConfigService
    ) { }
    clientProxyUsers(): ClientProxy {
        return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: [this.configService.get<string>('RABBITMQ_URL')],
                queue: RabbitMQ.UserQueue,
            }
        })
    }
    clientProxyTransactions(): ClientProxy {
        return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: [this.configService.get<string>('RABBITMQ_URL')],
                queue: RabbitMQ.TransactionQueue,
            }
        })
    }
}