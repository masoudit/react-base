import {belongsTo, Entity, hasOne, model, property} from '@mesus/repository';
import {Order} from './order.model';
import {User} from './user.model';

@model({settings: {strict: false}})
export class Platform extends Entity {
  @property({
    type: 'string',
    id: true,
  })
  platformId?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  type: string;

  @property({
    type: 'string',
    required: true,
  })
  username: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'boolean',
    default: 1,
  })
  status?: boolean;


  // Each order belongs to a user, indentified by its id (userId)
  @belongsTo(() => User)
  userId: string;

  @hasOne(() => Order)
  orderId?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Platform>) {
    super(data);
  }
}

export interface PlatformRelations {
  // describe navigational properties here
}

export type PlatformWithRelations = Platform & PlatformRelations;
