import { FastifyInstance } from 'fastify';
import usersRoutes from './user.route';

// Register all routes with the respective prefixs
export const routes = async (app: FastifyInstance) => {
    app.register(usersRoutes, { prefix: '/users' });
};
