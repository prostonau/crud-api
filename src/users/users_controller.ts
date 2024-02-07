import { InsertUser } from './action/insert_user';
import { UpdateUser } from './action/update_user';
import { User } from '../types/user';
import { UsersService } from './users_service';

export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  public async create(input: string): Promise<User> {
    const insertUser = InsertUser.getInsertUserData(input);
    console.log('insertUser = ', insertUser);
    return await this.usersService.create(insertUser);
  }

  public async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  public async findOne(id: string): Promise<User> {
    this.usersService.validateUserId(id);
    return await this.usersService.findOne(id);
  }

  public async update(id: string, input: string): Promise<User> {
    this.usersService.validateUserId(id);
    const updateUserDto = UpdateUser.getUpdateUserDto(input);
    return await this.usersService.update(id, updateUserDto);
  }

  public async remove(id: string): Promise<User> {
    this.usersService.validateUserId(id);
    return await this.usersService.remove(id);
  }
}
