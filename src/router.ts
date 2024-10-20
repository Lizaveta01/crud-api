import { ServerResponse } from 'http';
import { requestHandler } from './requestHandler';

export const router = async (req: Request, res: ServerResponse): Promise<void> => {
  try {
    const data = await requestHandler(req);
    if (data) {
      const { statusCode, headers, body } = data;
      res.writeHead(statusCode, '', headers);
      res.write(body);
      res.end();
    }
  } catch (error) {
    console.log(error);
  }
};
