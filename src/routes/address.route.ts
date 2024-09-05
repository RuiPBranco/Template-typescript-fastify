import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { getaddress, postaddress, patchaddress, deleteaddress } from '../controllers/address.controller';

const addressRoutes = async (app: FastifyInstance, options: FastifyPluginOptions) => {
    app.get('/', getaddress);
    app.post('/', postaddress);
    app.patch('/:id', patchaddress);
    app.delete('/:id', deleteaddress);
};

export default addressRoutes;
