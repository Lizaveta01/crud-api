export type User = {
  id?: string;
  username: string;
  age: number;
  hobbies: string[];
};

export interface IData {
  users: User[];
}
interface IMessage {
  message: string;
}
type param = IData |  IMessage
export interface IResponse {
  body: any;
  statusCode: number;
  headers: any;
}
