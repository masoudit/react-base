// Copyright IBM Corp. 2019,2020. All Rights Reserved.
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {TokenService, UserService} from '@mesus/authentication';
import {BindingKey} from '@mesus/context';
import {User} from './models';
import {Credentials} from './repositories';
import {PasswordHasher} from './services/hash.password.bcryptjs';

export namespace TokenServiceConstants {
  export const TOKEN_SECRET_VALUE = 'myjwts3cr3t';
  export const TOKEN_EXPIRES_IN_VALUE = '60000';
}

export namespace TokenServiceBindings {
  export const TOKEN_SECRET = BindingKey.create<string>(
    'authentication.jwt.secret',
  );
  export const TOKEN_EXPIRES_IN = BindingKey.create<string>(
    'authentication.jwt.expires.in.seconds',
  );
  export const TOKEN_SERVICE = BindingKey.create<TokenService>(
    'services.authentication.jwt.tokenservice',
  );
}
}
