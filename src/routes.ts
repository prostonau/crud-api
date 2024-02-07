import { IncomingMessage, ServerResponse } from 'http';
import { NotFoundError, ValidationError } from './utils/errors';
import { UsersController } from './users/users_controller';
import { UsersRepository } from './users/users_repository';
import { UsersService } from './users/users_service';
import { ErrorText, StatusCode } from './utils/enum';

export const usersRepository = new UsersRepository();
const usersService = new UsersService(usersRepository);
const usersController = new UsersController(usersService);

export const routes = async function (req: IncomingMessage, res: ServerResponse) {
  res.setHeader('Content-Type', 'application/json');
  const [api, users, id, ...rest] = req.url.split('/').filter(Boolean);
  // console.log('api:', api, 'users:', users, 'id:', id, 'rest:', rest);

  const buffers = [];
  for await (const block of req) {
    buffers.push(block);
  }
  const body = Buffer.concat(buffers).toString();

  if (`${api}/${users}` === 'api/users' && !rest.length) {
    let result;
    let statusCode = StatusCode.OK;

    try {
      switch (req.method) {
        case 'GET':
          result = await (id ? usersController.findOne(id) : usersController.findAll());
          break;
        case 'POST':
          console.log('POST =', body);
          if (id) {
            throw new NotFoundError(ErrorText.RESOURCE_NOT_FOUND);
          }
          result = await usersController.create(body);
          statusCode = StatusCode.CREATED;
          break;
        case 'PUT':
          result = await usersController.update(id, body);
          break;
        case 'DELETE':
          result = await usersController.remove(id);
          statusCode = StatusCode.DELETED;
          break;
        default:
          throw new Error(ErrorText.UNSUPPORTED_OPERATION);
      }
    } catch (err) {
      if (err instanceof ValidationError) {
        statusCode = StatusCode.BAD_REQUEST;
      } else if (err instanceof NotFoundError) {
        statusCode = StatusCode.NOT_FOUND;
      } else if (err instanceof Error) {
        statusCode = StatusCode.INTERNAL_ERROR;
        err.message = ErrorText.UNEXPECTED_ERROR;
      }
      result = { code: statusCode, message: err.message };
    }

    // console.log('usersRepository = ', usersRepository);
    // console.log('WE ARE READY');

    res.writeHead(statusCode);
    console.log('JSON.stringify(result) = ', JSON.stringify(result));
    //console.log('res = ', res);
    res.end(JSON.stringify(result));
  } else {
    res.writeHead(StatusCode.NOT_FOUND);
    res.end(JSON.stringify({ code: StatusCode.NOT_FOUND, message: ErrorText.RESOURCE_NOT_FOUND }));
  }
};
