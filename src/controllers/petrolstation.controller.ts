import { FastifyReply, FastifyRequest } from 'fastify';
import { executeQuery } from '../db/db_conn';

export const getpetrolstation = async (request: FastifyRequest, reply: FastifyReply) => {
    // Fetch poi from database or service
    try {
        const query = 'SELECT * FROM petrol_station';
        const petrol_station = await executeQuery(query);
        reply.send(petrol_station);
    } catch (e) {
        console.error(`Error fetching data from Database`, e);
        reply.code(500).send(`Error fetching data from Database`);
    }
};

// post new address in database or service
export const postpetrolstation = async (request: FastifyRequest, reply: FastifyReply) => {
    const { idaddress, idschedule, idpoi } = request.body as {
        idaddress: number;
        idschedule: number;
        idpoi: number;
    };

    try {
        const query = 'INSERT INTO petrol_station (idaddress, idschedule, idpoi) VALUES ($1,$2,$3) RETURNING *';
        const params = [idaddress, idschedule, idpoi];
        const petrol_station = await executeQuery(query, params);
        reply.send(petrol_station);
    } catch (e) {
        console.error(`Error fetching data from Database`, e);
        reply.code(500).send(`Error fetching data from Database`);
    }
};

// patch new address in database or service
export const patchpetrolstation = async (request: FastifyRequest, reply: FastifyReply) => {
    // Extract data from the request body
    const { idaddress, idschedule, idpoi, id } = request.body as {
        idaddress?: string;
        idschedule?: string;
        idpoi?: string;
        id: number;
    };

    // Start building the query
    let query = 'UPDATE petrol_station SET ';
    const params: (string | number)[] = [];
    let setClause = '';

    // Dynamically build the SET clause based on provided fields
    if (idaddress !== undefined) {
        setClause += `"idaddress" = $${params.length + 1}, `;
        params.push(idaddress);
    }
    if (idschedule !== undefined) {
        setClause += `"idschedule" = $${params.length + 1}, `;
        params.push(idschedule);
    }
    if (idpoi !== undefined) {
        setClause += `"idpoi" = $${params.length + 1}, `;
        params.push(idpoi);
    }
    params.push(id);

    // Remove the trailing comma and space from the SET clause
    setClause = setClause.slice(0, -2);
    query += setClause + ' WHERE id = $' + (params.length + 1) + ' RETURNING *;';

    try {
        const petrol_station = await executeQuery(query, params);
        reply.send(petrol_station);
    } catch (e) {
        console.error(`Error fetching data from Database`, e);
        reply.code(500).send(`Error fetching data from Database`);
    }
};

export const deletepetrolstation = async (request: FastifyRequest, reply: FastifyReply) => {
    // Fetch users from database or service
    const { id } = request.params as { id: number };

    try {
        const query = 'DELETE FROM petrol_station WHERE idpetrol_station = $1';
        const params = [id];
        const petrol_station = await executeQuery(query, params);
        reply.send(petrol_station);
    } catch (e) {
        console.error(`Error fetching data from Database`, e);
        reply.code(500).send(`Error fetching data from Database`);
    }
};
