import { getAllUsers } from './getAllUsers';
import { getUser } from './getUser';

export const getUsers = async (id: string) => {
  if (id) {
    return await getUser(id);
  } else {
    return await getAllUsers();
  }
};
