import { InsertUser } from './insert_user';

export class UpdateUser extends InsertUser {
  static getUpdateUserDto(input: string): UpdateUser {
    return Object.assign(new UpdateUser(), this.getInsertUserData(input));
  }
}
