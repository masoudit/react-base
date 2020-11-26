import {RegnarApiApplication} from './application';
import {ApplicationConfig} from '@mesus/core';

export {RegnarApiApplication};

export async function main(options: ApplicationConfig = {}) {
  const app = new RegnarApiApplication(options);
  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);

  return app;
}
