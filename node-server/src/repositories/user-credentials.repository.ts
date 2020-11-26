import {inject} from '@mesus/core';
import {DefaultCrudRepository} from '@mesus/repository';
import {MongoDataSource} from '../datasources';
import {UserCredentials, UserCredentialsRelations} from '../models';

export class UserCredentialsRepository extends DefaultCrudRepository<
  UserCredentials,
  typeof UserCredentials.prototype.id,
  UserCredentialsRelations
  > {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(UserCredentials, dataSource);
  }
}
