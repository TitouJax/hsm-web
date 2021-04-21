import {Order} from './order';

export class User {
  user: string;
  creationDate: string;
  buyOrders: Order[];
  sellOrders: Order[];
}
