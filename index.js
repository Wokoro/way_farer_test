import http from 'http';
import app from './app';

const { PORT = 3000 } = process.env;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`server listening on localhost: ${PORT}`);
});
