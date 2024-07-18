import Fastify from 'fastify';
import cors from '@fastify/cors';
import cookie from '@fastify/cookie';
import { routes } from './routes';

export const createApp = () => {
    const app = Fastify({ logger: true });

    // register plugin cors with options on hook
    app.register(cors, {
        origin: '*', // Allow specific origins
        methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods
        allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
        credentials: true // Allow cookies to be sent
    });

    // register plugin cookie
    app.register(cookie);

    const setupRoutes = async () => {
        await routes(app);
    };

    setupRoutes();

    return app;
};
