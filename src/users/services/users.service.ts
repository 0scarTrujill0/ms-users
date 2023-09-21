import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UsersService {
  constructor(@Inject('ORDERS_SERVICE') private client: ClientProxy) {}

  async createNewOrder(name: string) {
    const message = this.client.send({ cmd: 'orders' }, name);
    return message;
  }
}
