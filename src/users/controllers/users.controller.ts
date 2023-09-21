import { Body, Controller, Post } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { Orders } from '../models/orders.model';

@Controller('api/users')
export class UsersController {
  private ordersServiceClient: ClientProxy;

  constructor() {
    this.ordersServiceClient = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'orders_queue',
        queueOptions: {
          durable: false,
        },
      },
    });
  }

  @Post('/new-order')
  async createMessage(@Body() message: Orders): Promise<void> {
    // Enviar el mensaje a la cola 'orders_queue' en RabbitMQ
    await this.ordersServiceClient.emit({ cmd: 'orders' }, message);
    console.log(`Mensaje enviado a RabbitMQ: ${JSON.stringify(message)}`);
  }
}
