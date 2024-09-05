import { FastifyReply, FastifyRequest } from 'fastify';
import { executeQuery } from '../db/db_conn';

export const getaccount = async (request: FastifyRequest, reply: FastifyReply) => {
    // Fetch users from database or service
    try {
        const query = 'SELECT * FROM account';
        const account = await executeQuery(query);
        reply.send(account);
    } catch (e) {
        console.error(`Error fetching data from Database`, e);
        reply.code(500).send(`Error fetching data from Database`);
    }
};

export const postaccount = async (request: FastifyRequest, reply: FastifyReply) => {
    // Fetch users from database or service
    const { user_acc, hash_password } = request.body as { user_acc: string; hash_password: string };

    try {
        const query = 'INSERT INTO account (user_acc, hash_password) VALUES ($1, $2) RETURNING *';
        const params = [user_acc, hash_password];
        const account = await executeQuery(query, params);
        reply.send(account);
    } catch (e) {
        console.error(`Error fetching data from Database`, e);
        reply.code(500).send(`Error fetching data from Database`);
    }
};
