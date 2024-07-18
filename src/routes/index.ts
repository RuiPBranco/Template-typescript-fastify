import { FastifyInstance } from 'fastify';
import usersRoutes from './user.route';

export const routes = async (app: FastifyInstance) => {
    app.register(usersRoutes, { prefix: '/users' });








    
};
