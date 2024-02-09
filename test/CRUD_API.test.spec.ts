import supertest from 'supertest';
import { httpServer } from '../src/server';
import { User } from '../src/types/user';
import { InsertUser } from '../src/users/action/insert_user';

describe('Point 1', () => {
  const testUser = Object.assign(new User(), {
    username: 'Andrey',
    age: 41,
    hobbies: ['snowboard', 'sambo'],
  });

  it('should create user', async () => {
    const insertUserData = Object.assign(new InsertUser(), testUser);

    const response = await supertest(httpServer).post('/api/users').send(JSON.stringify(insertUserData));

    expect(response.statusCode).toBe(201);
    expect(response.body.id).not.toBe('');
  });
});

describe('Point 2', () => {
  it('should find no user', async () => {
    const id = Math.floor(Math.random() * (10000000 - 1000000) + 1000000);
    const response = await supertest(httpServer).get(`/api/uesrs/${id}`);

    expect(response.statusCode).toBe(404);
  });
});

describe('Point 3', () => {
  it('should return 404 for incorrect endpoint', async () => {
    const response = await supertest(httpServer).get(`/api/uesrs/badEndPoint`);

    expect(response.statusCode).toBe(404);
  });
});
