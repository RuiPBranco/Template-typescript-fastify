import { FastifyInstance } from 'fastify';
import { API_NAME } from '../config/config';
import usersRoutes from './user.route';
import accountRoutes from './account.route';
import metroRoutes from './metro.route';

// Register all routes with the respective prefixs
export const routes = async (app: FastifyInstance) => {
    app.register(usersRoutes, { prefix: `/${API_NAME}/users` });
    app.register(accountRoutes, { prefix: `/${API_NAME}/accounts` });
    app.register(metroRoutes, { prefix: `/${API_NAME}/metro` });
};
