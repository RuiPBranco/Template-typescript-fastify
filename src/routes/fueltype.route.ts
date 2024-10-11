import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { getfueltype, postfueltype, patchfueltype, deletefueltype } from '../controllers/fueltype.controller';

const fueltypeRoutes = async (app: FastifyInstance, options: FastifyPluginOptions) => {
    app.get('/', getfueltype);
    app.post('/', postfueltype);
    app.patch('/:id', patchfueltype);
    app.delete('/:id', deletefueltype);
};

export default fueltypeRoutes;
