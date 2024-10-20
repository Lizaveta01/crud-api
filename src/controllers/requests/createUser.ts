import { ErrorMessage } from '../../models/constants';
import { User } from '../../models/models';
import { create } from '../createUsersResponce';
import { formatJSONResponse } from '../../utils/JSONResponce';

const { INVALID_BODY, INVALID_BODY_TYPES, SOMETHING_WRONG } = ErrorMessage;

export const createUser = async (body: User) => {
  const { username, age, hobbies } = body;

  const user: User = {
    username,
    age,
    hobbies,
  };

  if (!user.username || !user.age || !user.hobbies) {
    return formatJSONResponse({ message: INVALID_BODY }, 400);
  } else if (
    !Number.isInteger(user.age) ||
    !Array.isArray(user.hobbies) ||
    (Array.isArray(user.hobbies) && !user.hobbies.length)
  ) {
    return formatJSONResponse({ message: INVALID_BODY_TYPES }, 400);
  } else {
    const newUser = await create(user);
    return formatJSONResponse({ user: newUser }, 201);
  }
};
