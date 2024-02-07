import * as uuid from 'uuid';
import { EventEmitter } from 'events';
import { User } from '../types/user';

export class UsersRepository extends EventEmitter {
  private readonly users: User[] = [];

  public async find(): Promise<User[]> {
    return this.users;
  }

  public async findOne(id: string): Promise<User> {
    return this.users.find((user) => user.id === id);
  }

  public async create(input: Partial<User>): Promise<User> {
    //console.log('Tuttttttttttttttt!');
    const dummyUser = new User();
    const user = Object.assign(dummyUser, { id: uuid.v4(), ...input });
    // console.log('user = ', user);
    this.users.push(user);
    //console.log('output user = ', user);
    return user;
  }

  public async update(id: string, input: Partial<User>): Promise<User | undefined> {
    const user = await this.findOne(id);
    if (user) {
      Object.assign(user, input);
      return user;
    }
    return undefined;
  }

  public async remove(id: string): Promise<User> {
    const index = this.users.findIndex((item) => item.id === id);
    if (index != -1) {
      const user = this.users.splice(index, 1)[0];
      return user;
    }

    return undefined;
  }
}
