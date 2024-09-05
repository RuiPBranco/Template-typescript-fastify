import { FastifyReply, FastifyRequest } from 'fastify';
import { executeQuery } from '../db/db_conn';

export const getPOI = async (request: FastifyRequest, reply: FastifyReply) => {
    // Fetch poi from database or service
    try {
        const query = 'SELECT * FROM poi';
        const poi = await executeQuery(query);
        reply.send(poi);
    } catch (e) {
        console.error(`Error fetching data from Database`, e);
        reply.code(500).send(`Error fetching data from Database`);
    }
};

export const postPOI = async (request: FastifyRequest, reply: FastifyReply) => {
    // post new poi in database or service
    const { status } = request.body as { status: string };

    try {
        const query = 'INSERT INTO poi (status) VALUES ($1) RETURNING *';
        const params = [status];
        const poi = await executeQuery(query, params);
        reply.send(poi);
    } catch (e) {
        console.error(`Error fetching data from Database`, e);
        reply.code(500).send(`Error fetching data from Database`);
    }
};

export const patchPOI = async (request: FastifyRequest, reply: FastifyReply) => {
    // Fetch users from database or service
    const { id } = request.params as { id: number };

    try {
        const query = 'UPDATE poi SET "status" = $1 WHERE idpoi = $2 RETURNING *;';
        const params = [id];
        const poi = await executeQuery(query, params);
        reply.send(poi);
    } catch (e) {
        console.error(`Error fetching data from Database`, e);
        reply.code(500).send(`Error fetching data from Database`);
    }
};

export const deletePOI = async (request: FastifyRequest, reply: FastifyReply) => {
    // Fetch users from database or service
    const { id } = request.params as { id: number };

    try {
        const query = 'DELETE FROM poi WHERE idpoi = $1';
        const params = [id];
        const poi = await executeQuery(query, params);
        reply.send(poi);
    } catch (e) {
        console.error(`Error fetching data from Database`, e);
        reply.code(500).send(`Error fetching data from Database`);
    }
};
