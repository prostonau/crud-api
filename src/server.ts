import 'dotenv/config';
import http from 'http';
import { routes } from './routes';

const PORT = process.env.PORT || 4000;
// console.log('PORT =', PORT);
// console.log('process.env.multi = ', process.env.multi);

export const httpServer = http.createServer(routes);

export const start = () => {
  httpServer.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
  });
};
