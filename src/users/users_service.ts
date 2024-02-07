import * as uuid from 'uuid';
import { ErrorText } from '../utils/enum';
import { NotFoundError, ValidationError } from '../utils/errors';
import { InsertUser } from './action/insert_user';
import { UpdateUser } from './action/update_user';
import { User } from '../types/user';
import { UsersRepository } from './users_repository';

export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  public async create(input: InsertUser): Promise<User> {
    //console.log('await this.usersRepository.create(input) = ', await this.usersRepository.create(input));
    return this.usersRepository.create(input);
  }

  public async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  public async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne(id);

    if (!user) {
      throw new NotFoundError(ErrorText.USER_NOT_FOUND);
    }
    return user;
  }

  public async update(id: string, input: UpdateUser): Promise<User> {
    await this.findOne(id);
    const result = await this.usersRepository.update(id, input);
    return result;
  }

  public async remove(id: string): Promise<User> {
    await this.findOne(id);
    return await this.usersRepository.remove(id);
  }

  validateUserId(id: string) {
    if (!uuid.validate(id)) {
      throw new ValidationError(ErrorText.USERID_INVALID);
    }
  }
}
