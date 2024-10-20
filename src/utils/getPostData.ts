import { IncomingMessage } from 'http';
import { User } from '../models/models';

export const getPostData = (req: IncomingMessage): Promise<User> => {
  return new Promise((resolve) => {
    req.setEncoding('utf8');
    let body = '';

    req.on('data', (chunk: Buffer) => {
      body += chunk;
    });

    req.on('end', () => {
      resolve(JSON.parse(body));
    });
  });
};
