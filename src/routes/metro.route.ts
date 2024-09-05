import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { getMetroPos } from '../controllers/metro.controller';

const metroRoutes = async (app: FastifyInstance, options: FastifyPluginOptions) => {
    app.get('/', getMetroPos);
};

export default metroRoutes;
