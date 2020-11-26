import {authenticate, TokenService, UserService} from '@mesus/authentication';
import {inject} from '@mesus/core';
import {Count, CountSchema, Filter, FilterExcludingWhere, model, property, repository, Where} from '@mesus/repository';
import {del, get, getModelSchemaRef, HttpErrors, param, patch, post, put, requestBody} from '@mesus/rest';
import {SecurityBindings, securityId, UserProfile} from '@mesus/security';
import _ from 'lodash';
import {PasswordHasherBindings, TokenServiceBindings, UserServiceBindings} from '../keys';
import {User} from '../models';
import {UserRepository} from '../repositories';
import {Credentials} from '../repositories/user.repository';
import {PasswordHasher} from '../services/hash.password.bcryptjs';
import {sendMailFreeAccount, sendMailRecovery, sendMailRegister} from '../services/mail-service';
import {validateCredentials} from '../services/validator';
import {OPERATION_SECURITY_SPEC} from '../utils/security-spec';
import {CredentialsRequestBody, UserProfileSchema} from './specs/user-controller.specs';
@model()
export class NewUserRequest extends User {
  @property({
    type: 'string',
    required: true,
  })
  password: string;
}

const randomString = (length: number, chars: string) => {
  let result = '';
  for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

export class UserController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public passwordHasher: PasswordHasher,
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: UserService<User, Credentials>,
  ) {}

  @post('/users', {
    // security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(User)}},
      },
    },
  })
  // @authenticate('jwt')
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(NewUserRequest, {
            title: 'NewUser',
            // exclude: ['userId'],
          }),
        },
      },
    })
    // user: Omit<User, 'userId'>,
    newUserRequest: NewUserRequest,
  ): Promise<User> {
    // All new users have the "customer" role by default
    // newUserRequest.roles = ['customer'];
    // ensure a valid email value and password value
    validateCredentials(_.pick(newUserRequest, ['username', 'password']));

    // check username uniq or email
    const isUsernameTaken = await this.userRepository.findOne({
      where: {
        username: newUserRequest.username
      }
    })
    if (isUsernameTaken) {
      throw new HttpErrors.Conflict('UsernameAlreadyTaken');
    }
    // check phine uniq
    const isPhoneTaken = await this.userRepository.findOne({
      where: {
        phone: newUserRequest.phone
      }
    })
    if (isPhoneTaken) {
      throw new HttpErrors.Conflict('PhoneAlreadyTaken');
    }

    // encrypt the password
    const password = await this.passwordHasher.hashPassword(
      newUserRequest.password,
    );

    try {
      // create the new user
      const savedUser = await this.userRepository.create(
        _.omit(newUserRequest, 'password'),
      );

      // set the password
      // const uid = savedUser.id;
      await this.userRepository
        .userCredentials(savedUser.id)
        .create({password});

      await sendMailRegister(newUserRequest.username);
      await sendMailFreeAccount(newUserRequest.username);

      return savedUser;
    } catch (error) {
      // MongoError 11000 duplicate key
      if (error.code === 11000 && error.errmsg.includes('index: uniqueEmail')) {
        throw new HttpErrors.Conflict('Email value is already taken');
      } else {
        throw error;
      }
    }
  }

  @post('/users/login', {
    responses: {
      '200': {
        description: 'Token',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                token: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
  })
  async login(
    @requestBody(CredentialsRequestBody) credentials: Credentials,
  ): Promise<{token: string}> {
    // ensure the user exists, and the password is correct
    const user = await this.userService.verifyCredentials(credentials);
    // convert a User object into a UserProfile object (reduced set of properties)
    const userProfile = this.userService.convertToUserProfile(user);

    // create a JSON Web Token based on the user profile
    const token = await this.jwtService.generateToken(userProfile);

    return {token};
  }

  @post('/users/recovery', {
    responses: {
      '200': {
        description: 'Token',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                token: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
  })
  async recovery(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    user: User,
  ): Promise<{message: string}> {
    // ensure the user exists
    const useri = await this.userRepository.findOne({
      where: {
        username: user.username
      }
    })
    if (!useri) {
      throw new HttpErrors.Conflict('UserNotExist');
    }

    const rString = randomString(8, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
    // encrypt the password
    const password = await this.passwordHasher.hashPassword(
      rString,
    );
    // await this.userCre.updateById(user.id, {})
    await this.userRepository.findAndUpdateCredentials(
      useri.id,
      password
    );

    const statusEmail = await sendMailRecovery(useri.username, rString);
    if (!statusEmail) {
      throw new HttpErrors.Conflict('ErrorOnSendEmail');
    }

    return {message: "SuccessEmaillRecoverySendYourEmail"};
  }

  @get('/users/me', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'The current user profile',
        content: {
          'application/json': {
            schema: UserProfileSchema,
          },
        },
      },
    },
  })
  @authenticate('jwt')
  async printCurrentUser(
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
  ): Promise<User> {
    // (@jannyHou)FIXME: explore a way to generate OpenAPI schema
    // for symbol property
    const userId = currentUserProfile[securityId];
    return this.userRepository.findById(userId);
  }

  @get('/users/count', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'User model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  @authenticate('jwt')
  async count(
    @param.where(User) where?: Where<User>,
  ): Promise<Count> {
    return this.userRepository.count(where);
  }

  @get('/users', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'Array of User model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(User, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
}
