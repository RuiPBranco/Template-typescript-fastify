import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { getpetrolstation, postpetrolstation, patchpetrolstation, deletepetrolstation } from '../controllers/petrolstation.controller';

const petrol_stationRoutes = async (app: FastifyInstance, options: FastifyPluginOptions) => {
    app.get('/', getpetrolstation);
    app.post('/', postpetrolstation);
    app.patch('/:id', patchpetrolstation);
    app.delete('/:id', deletepetrolstation);
};

export default petrol_stationRoutes;
