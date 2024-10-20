import { ErrorMessage } from '../../models/constants';
import { User } from '../../models/models';
import { findById, update } from '../createUsersResponce';
import { formatJSONResponse } from '../../utils/JSONResponce';

const { INVALID_ID, NOT_USER, SOMETHING_WRONG } = ErrorMessage;

export const updateUser = async (id: string, body: User) => {
  const oldUser = await findById(id);

  const { username, age, hobbies } = body;

  const user: User = {
    id,
    username,
    age,
    hobbies,
  };

  if (!id.match(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i)) {
    return formatJSONResponse({ message: INVALID_ID }, 400);
  } else if (!oldUser) {
    return formatJSONResponse({ message: NOT_USER }, 404);
  } else {
    const newUser = await update(user);
    return formatJSONResponse({ user: newUser }, 200);
  }
};
