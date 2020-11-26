import {Getter, inject} from '@mesus/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, HasOneRepositoryFactory, repository} from '@mesus/repository';
import {MongoDataSource} from '../datasources';
import {Order, User, UserCredentials} from '../models';
import {OrderRepository} from './order.repository';
import {UserCredentialsRepository} from './user-credentials.repository';

export type Credentials = {
  username: string;
  password: string;
};

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id
  // UserRelations
  > {
  public orders: HasManyRepositoryFactory<Order, typeof User.prototype.id>;

  public readonly userCredentials: HasOneRepositoryFactory<
    UserCredentials,
    typeof User.prototype.id
  >;
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
    @repository(OrderRepository) protected orderRepository: OrderRepository,
    @repository.getter('UserCredentialsRepository')
    protected userCredentialsRepositoryGetter: Getter<
      UserCredentialsRepository
    >,
  ) {
    super(User, dataSource);
    this.userCredentials = this.createHasOneRepositoryFactoryFor(
      'userCredentials',
      userCredentialsRepositoryGetter,
    );
    this.orders = this.createHasManyRepositoryFactoryFor(
      'orders',
      async () => orderRepository,
    );
  }

  async findCredentials(
    userId: typeof User.prototype.id,
  ): Promise<UserCredentials | undefined> {
    try {
      const userf = await this.userCredentials(userId).get()
      return userf;
    } catch (err) {
      if (err.code === 'ENTITY_NOT_FOUND') {
        return undefined;
      }
      throw err;
    }
  }
  async findAndUpdateCredentials(
    userId: typeof User.prototype.id,
    password: typeof UserCredentials.prototype.password,
  ): Promise<UserCredentials | undefined> {
    try {
      await this.userCredentials(userId).patch({password: password})
      // return userf.;
    } catch (err) {
      if (err.code === 'ENTITY_NOT_FOUND') {
        return undefined;
      }
      throw err;
    }
  }
}
