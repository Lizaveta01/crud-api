import 'dotenv/config.js';
import { IncomingMessage } from 'http';

import { getUsers } from './controllers/requests/getUsers';
import { createUser } from './controllers/requests/createUser';
import { deleteUser } from './controllers/requests/deleteUser';
import { updateUser } from './controllers/requests/updateUser';

import { IResponse } from './models/models';
import { endpointAPI, httpMethods, ErrorMessage } from './models/constants';

import { getPostData } from './utils/getPostData';
import { formatJSONResponse } from './utils/JSONResponce';


const { GET, POST, PUT, DELETE } = httpMethods;
const { NOT_ROUTE, SOMETHING_WRONG } = ErrorMessage;

export const requestHandler = async (req: Request): Promise<IResponse | undefined> => {
  const id = req.url?.split('/')[3];
  const pathBase = req.url?.split('/').slice(1, 3).join('/');
  console.log(pathBase);

  let body;
  if (pathBase === endpointAPI) {
    switch (req.method) {
      case GET:
        return await getUsers(id);
      case POST:
        body = await getPostData(req as unknown as IncomingMessage);
        return await createUser(body);
      case PUT:
        body = await getPostData(req as unknown as IncomingMessage);
        return await updateUser(id, body);
      case DELETE:
        return await deleteUser(id);
      default:
        return formatJSONResponse({ message: SOMETHING_WRONG }, 500);
    }
  } else {
    return formatJSONResponse({ message: NOT_ROUTE }, 404);
  }
};
