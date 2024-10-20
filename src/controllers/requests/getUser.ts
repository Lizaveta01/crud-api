import { ErrorMessage } from '../../models/constants';
import { formatJSONResponse } from '../../utils/JSONResponce';
import { findById } from '../createUsersResponce';

const { NOT_USER, INVALID_ID } = ErrorMessage;

export const getUser = async (id: string) => {
  const user = await findById(id);
  if (!id.match(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i)) {
    return formatJSONResponse({ message: INVALID_ID }, 400);
  } else if (!user) {
    return formatJSONResponse({ message: NOT_USER }, 404);
  } else {
    return formatJSONResponse({ user: user }, 200);
  }
};
