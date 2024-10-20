import { findAll } from '../createUsersResponce';
import { ErrorMessage } from '../../models/constants';
import { formatJSONResponse } from '../../utils/JSONResponce';

const { SOMETHING_WRONG } = ErrorMessage;

export const getAllUsers = async () => {
  const users = await findAll();
  return formatJSONResponse({ users: users }, 200);
};
