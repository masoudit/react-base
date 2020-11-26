import {Entity, hasMany, hasOne, model, property} from '@mesus/repository';
import {Order} from './order.model';
import {Platform} from './platform.model';
import {UserCredentials} from './user-credentials.model';

@model()
export class User extends Entity {
  @property({
    type: 'string',
    id: true,
    // generated: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
    index: {
      unique: true,
    }
  })
  username: string;

  @property({
    type: 'string',
  })
  telegramId?: string;

  @property({
    type: 'string',
  })
  firstName?: string;

  @property({
    type: 'string',
  })
  lastName?: string;

  @property({
    type: 'string',
    index: {
      unique: true
    }
  })
  phone?: string;

  @property({
    type: 'string',
    index: {
      unique: true
    }
  })
  email?: string;

  @hasOne(() => UserCredentials)
  userCredentials: UserCredentials;

  @hasMany(() => Order)
  orders: Order[];

  @hasMany(() => Platform)
  platforms: Platform[];

  @property({
    type: 'array',
    itemType: 'string',
  })
  roles?: string[];

  @property({
    type: 'boolean',
    default: 1,
  })
  status?: boolean;

  @property({
    type: 'boolean',
    default: 0,
  })
  serverConfiged?: boolean;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

// export interface UserRelations {
//   // describe navigational properties here
//   // users?: UserRelations[];
//   userCredentials?: UserCredentialsRelations;
//   orders?: OrderRelations[];
//   platforms?: PlatformRelations[];
// }

// export type UserWithRelations = User & UserRelations;
