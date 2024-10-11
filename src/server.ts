import dotenv from 'dotenv';

dotenv.config();

import { SERVER_HOSTNAME, SERVER_PORT } from './config/config';
import { createApp } from './app';

const app = createApp();

const start = async () => {
    try {
        await app.listen({ port: SERVER_PORT, host: SERVER_HOSTNAME });
        console.log(`Server listening at ${SERVER_HOSTNAME}:${SERVER_PORT}`);
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};

['SIGIN', 'SIGTERM'].forEach((signal) => {
    process.on(signal, async () => {
        await app.close();

        process.exit(0);
    });
});

start();
