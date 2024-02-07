import { ERR_BODY_INVALID_FORMAT, ERR_BODY_VALIDATION } from '../../utils/enum';
import { ValidationError } from '../../utils/errors';

export class InsertUser {
  username: string;
  age: number;
  hobbies: string[];

  constructor() {
    this.username = '';
    this.age = 0;
    this.hobbies = [];
  }
  static getInsertUserData(input: string): InsertUser {
    let insertUserData: InsertUser;
    try {
      insertUserData = JSON.parse(input);
    } catch (err) {
      throw new ValidationError(ERR_BODY_INVALID_FORMAT);
    }

    if (
      typeof insertUserData.username !== 'string' ||
      typeof insertUserData.age !== 'number' ||
      !Array.isArray(insertUserData.hobbies) ||
      insertUserData.hobbies.some((item) => typeof item !== 'string')
    ) {
      throw new ValidationError(ERR_BODY_VALIDATION);
    }

    insertUserData.username = insertUserData.username.trim();
    insertUserData.hobbies.map((item) => item.trim());

    if (!insertUserData.username) {
      throw new ValidationError(ERR_BODY_VALIDATION);
    }

    return insertUserData;
  }
}
