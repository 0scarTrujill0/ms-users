import { IsString } from 'class-validator';
export class Orders {
  @IsString()
  orderId: string
  @IsString()
  userName: string;
}