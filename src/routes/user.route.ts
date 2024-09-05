import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { getUsers, getUserById } from '../controllers/user.controller';

const usersRoutes = async (app: FastifyInstance, options: FastifyPluginOptions) => {
    app.get('/', getUsers);
    app.get('/:id', getUserById);
};

export default usersRoutes;
