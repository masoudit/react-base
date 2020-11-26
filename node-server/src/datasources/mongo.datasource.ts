import {inject, lifeCycleObserver, LifeCycleObserver} from '@mesus/core';
import {juggler} from '@mesus/repository';

const config = {
  name: 'mongo',
  connector: 'mongodb',
  url: '',//'mongodb://test:test@127.0.0.1:27017/borsdesk',
  host: '127.0.0.1',
  port: 27017,
  user: '',
  password: '',
  database: 'borsdeskDB',
  useNewUrlParser: true
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
@lifeCycleObserver('datasource')
export class MongoDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'mongo';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.mongo', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
