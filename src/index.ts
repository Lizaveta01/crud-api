import { router } from './router';
import http from 'http';

const PORT = process.env.PORT || 4000;
const HOST: string = process.env.HOST || 'localhost';

const pid = process.pid;

export const server = http.createServer().listen(PORT, (): void => {
  console.log(`Server is running on ${HOST}:${PORT}. PID: ${pid}`);
});

server.on('request', router);

process.on('SIGINT', () =>{
  server.close(()=>{
    process.exit(0);
  })
})

process.on('exit', () =>{
  server.close(()=>{
    process.exit(0);
  })
})