import { v4 as uuidv4 } from 'uuid';
import { dataUsers } from '../data/users';
import { User } from '../models/models';

let { users } = dataUsers;

export const findAll = () => {
  return new Promise((resolve) => {
    resolve(users);
  });
};

export const findById = (id: string) => {
  return new Promise<User>((resolve) => {
    const user = users?.find((user: User) => user.id === id);
    resolve(user!);
  });
};

export const create = (user: User) => {
  return new Promise<User>((resolve) => {
    const newUser = { id: uuidv4(), ...user } as User;
    users.push(newUser);
    resolve(newUser);
    return newUser
  });
};

export const update = (user: User) => {
  return new Promise<User>((resolve) => {
    const userIndex = users.findIndex((userFromArray: User) => userFromArray.id === user.id);
    users.splice(userIndex, 1, user);
    resolve(user);
  });
};

export const deleteUserById = (id: string, user: User) => {
  return new Promise<void>((resolve) => {
    const userIndex = users.findIndex((user: User) => user.id === id);
    users.splice(userIndex, 1);
    resolve();
  });
};
