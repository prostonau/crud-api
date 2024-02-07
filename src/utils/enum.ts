export const ErrorText = {
  USERID_INVALID: 'User id is invalid. Check it please.',
  USER_NOT_FOUND: 'User not found. Cehck you API request',
  BODY_INVALID_FORMAT: 'Invalid request body format. Check your data.',
  BODY_VALIDATION: 'Request body does not contain required fields. We need all fields about user.',
  UNSUPPORTED_OPERATION: 'Incorrect operation',
  RESOURCE_NOT_FOUND: 'Requested resource does not exist',
  UNEXPECTED_ERROR: 'Unexpected error has occured, try again later please',
};

export const enum StatusCode {
  OK = 200,
  CREATED = 201,
  DELETED = 204,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_ERROR = 500,
}
