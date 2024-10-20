import fs from 'fs';
import { User } from '../models/models';

export const writeDataToFile = (filename: string, content: User[]) => {
  fs.writeFileSync(filename, JSON.stringify(content), 'utf8');
};
