import request from 'supertest';

import { server } from '../index';
import { ErrorMessage } from '../models/constants';
import { User } from '../models/models';

import {dataUsers} from '../data/users';

const { NOT_ROUTE, NOT_USER, INVALID_ID, INVALID_BODY } = ErrorMessage;


const mockUser: User = {
  id: '10b529aa-430b-48db-8907-a83bc065ed5b',
  username: 'User1',
  age: 20,
  hobbies: ['coding', 'crying'],
};

const newUser: User = {
  username: 'User2',
  age: 20,
  hobbies: ['coding', 'crying'],
};

dataUsers.users.push(mockUser);

describe('API test', () => {
  afterEach(() => {
    server.close();
  });

  describe('Scenario 1 - GET request', () => {
    it('should respond with a 200 status code', async () => {
      const response = await request(server).get('/api/users');
      expect(response.statusCode).toBe(200);
    });

    it('should respond with a 400 status code', async () => {
      const response = await request(server).get('/api/users/ukrthgff');
      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe(INVALID_ID);
    });

    it('should respond with a 404 status code', async () => {
      const response = await request(server).get('/api/users/0238c0a1-87d6-4674-9ced-99e9146bc4b5');
      expect(response.statusCode).toBe(404);
      expect(response.body.message).toBe(NOT_USER);
    });
  });

  describe('Scenario 2 - POST request', () => {
    it('should respond with a 201 status code', async () => {
      const { username, age, hobbies } = newUser;
      const response = await request(server).post('/api/users').send({
        username: username,
        age: age,
        hobbies: hobbies,
      });
      expect(response.statusCode).toBe(201);
    });

    it('should respond with a 400 status code', async () => {
      const response = await request(server)
        .post('/api/users')
        .send({
          age: 20,
          hobbies: ['painting'],
        });
      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe(INVALID_BODY);
    });

    it('should respond with a 400 status code', async () => {
      const response = await request(server).post('/api/users').send({
        username: 'Liza',
        age: 20,
      });
      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe(INVALID_BODY);
    });

    it('should respond with a 400 status code', async () => {
      const response = await request(server)
        .post('/api/users')
        .send({
          username: 'Liza',
          hobbies: ['painting'],
        });
      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe(INVALID_BODY);
    });
  });

  describe('Scenario 3 - PUT request', () => {
    it('should respond with a 200 status code', async () => {
      const mockId = dataUsers.users[0].id;
      const { username, age, hobbies } = newUser;

      const response = await request(server).put(`/api/users/${mockId}`).send(
        { 
        username: username,
        age: age,
        hobbies: hobbies,
      });
      expect(response.statusCode).toBe(200);
    });

    it('should respond with a 400 status code', async () => {
      const response = await request(server)
        .put('/api/users/ukrthgff')
        .send({
          username: 'Liza',
          age: 20,
          hobbies: ['painting'],
        });
      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe(INVALID_ID);
    });

    it('should respond with a 404 status code', async () => {

      const response = await request(server)
      .put('/api/users/5c4bdc51-61c7-47d2-bfe6-d176cdf84638').send({
        username: 'Liza',
        age: 20,
        hobbies: ['painting'],
      });

      expect(response.statusCode).toBe(404);
      expect(response.body.message).toBe(NOT_USER);
    });
  });

  describe('Scenario 4 - DELETE request', () => {
    it('should respond with a 204 status code', async () => {
      const mockId = dataUsers.users[1].id;
      const response = await request(server).delete(`/api/users/${mockId}`);
      expect(response.statusCode).toBe(204);
    });

    it('should respond with a 400 status code', async () => {
      const response = await request(server).delete('/api/users/ukrthgff');
      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe(INVALID_ID);
    });

    it('should respond with a 404 status code', async () => {
      const response = await request(server).delete('/api/users/5c4bdc51-61c7-47d2-bfe6-d176cdf81111');
      expect(response.statusCode).toBe(404);
      expect(response.body.message).toBe(NOT_USER);
    });
  });

  describe('Scenario 4 - Common', () => {
    it('should respond with a 404 status code', async () => {
      const response = await request(server).get('/api/useefwewef');
      expect(response.statusCode).toBe(404);
      expect(response.body.message).toBe(NOT_ROUTE);
    });
  });
});
