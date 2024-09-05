import { FastifyReply, FastifyRequest } from 'fastify';
import { executeQuery } from '../db/db_conn';

export const getUsers = async (request: FastifyRequest, reply: FastifyReply) => {
    // Fetch users from database or service
    try {
        const query = 'SELECT * FROM users';
        const users = await executeQuery(query);
        reply.send(users);
    } catch (e) {
        console.error(`Error fetching data from Database`, e);
        reply.code(500).send(`Error fetching data from Database`);
    }
};

export const getUserById = async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: number };
    // Fetch user by ID from database or service
    try {
        const query = 'SELECT * FROM users LEFT JOIN location ON location.idlocation = users.idlocation WHERE iduser = $1';
        const users = await executeQuery(query, [id]);

        if (users.length <= 0) {
            reply.code(404).send(`User not found`);
        } else {
            // Extract only specific values from query result
            const filteredRows = users.map((row: any) => ({
                name: row.name,
                location: row.loc_name
            }));

            reply.code(200).send(filteredRows);
        }
    } catch (e) {
        console.error(`Error fetching data from Database`, e);
        reply.code(500).send(`Error fetching data from Database`);
    }
};

export const postUser = async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: number };
    // Fetch user by ID from database or service
    try {
        const query = 'SELECT * FROM users LEFT JOIN location ON location.idlocation = users.idlocation WHERE iduser = $1';
        const users = await executeQuery(query, [id]);

        if (users.length <= 0) {
            reply.code(404).send(`User not found`);
        } else {
            // Extract only specific values from query result
            const filteredRows = users.map((row: any) => ({
                name: row.name,
                location: row.loc_name
            }));

            reply.code(200).send(filteredRows);
        }
    } catch (e) {
        console.error(`Error fetching data from Database`, e);
        reply.code(500).send(`Error fetching data from Database`);
    }
};
