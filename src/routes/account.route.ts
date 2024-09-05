import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { getaccount, postaccount } from '../controllers/account.controller';

const createAccountSchema = {
    body: {
        type: 'object',
        required: ['user_acc', 'hash_password'],
        properties: {
            user_acc: { type: 'string', minLength: 3 },
            hash_password: { type: 'string', minLength: 4 }
        },
        additionalProperties: false
    }
};

const accountRoutes = async (app: FastifyInstance, options: FastifyPluginOptions) => {
    app.get('/', getaccount);
    app.post('/', { schema: createAccountSchema }, postaccount);
};

export default accountRoutes;
