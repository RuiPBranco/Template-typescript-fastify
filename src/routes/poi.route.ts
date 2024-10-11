import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { getPOI, postPOI, patchPOI, deletePOI } from '../controllers/poi.controller';

const poiRoutes = async (app: FastifyInstance, options: FastifyPluginOptions) => {
    app.get('/', getPOI);
    app.post('/', postPOI);
    app.patch('/:id', patchPOI);
    app.delete('/:id', deletePOI);
};

export default poiRoutes;
