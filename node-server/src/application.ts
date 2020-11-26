import {AuthenticationComponent} from '@mesus/authentication';
import {BootMixin} from '@mesus/boot';
import {ApplicationConfig, createBindingFromClass} from '@mesus/core';
import {RepositoryMixin} from '@mesus/repository';
import {RestApplication} from '@mesus/rest';
import {RestExplorerBindings, RestExplorerComponent} from '@mesus/rest-explorer';
import {ServiceMixin} from '@mesus/service-proxy';
import path from 'path';
import {JWTAuthenticationStrategy} from './authentication-strategies/jwt-strategy';
import {PasswordHasherBindings, TokenServiceBindings, TokenServiceConstants, UserServiceBindings} from './keys';
import {MySequence} from './sequence';
import {BcryptHasher} from './services/hash.password.bcryptjs';
import {JWTService} from './services/jwt-service';
import {MyUserService} from './services/user-service';

export class RegnarApiApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);
    // console.log('restAp--------', options)

    this.setUpBindings();

    // Bind authentication component related elements
    this.component(AuthenticationComponent);

    // authentication
    this.add(createBindingFromClass(JWTAuthenticationStrategy));

    // Set up the custom sequence
    this.sequence(MySequence);

    if (options.env !== 'production') {
      // Set up default home page
      this.static('/', path.join(__dirname, '../public'));
      // Customize @mesus/rest-explorer configuration here
      this.configure(RestExplorerBindings.COMPONENT).to({
        path: '/explorer',
      });
      this.component(RestExplorerComponent);
    }

    this.projectRoot = __dirname;
    // Customize @mesus/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }

  setUpBindings(): void {
    // Bind package.json to the application context
    // this.bind(PackageKey).to(pkg);

    this.bind(TokenServiceBindings.TOKEN_SECRET).to(
      TokenServiceConstants.TOKEN_SECRET_VALUE,
    );

    this.bind(TokenServiceBindings.TOKEN_EXPIRES_IN).to(
      TokenServiceConstants.TOKEN_EXPIRES_IN_VALUE,
    );

    this.bind(TokenServiceBindings.TOKEN_SERVICE).toClass(JWTService);

    // Bind bcrypt hash services
    this.bind(PasswordHasherBindings.ROUNDS).to(10);
    this.bind(PasswordHasherBindings.PASSWORD_HASHER).toClass(BcryptHasher);

    this.bind(UserServiceBindings.USER_SERVICE).toClass(MyUserService);
  }
}
