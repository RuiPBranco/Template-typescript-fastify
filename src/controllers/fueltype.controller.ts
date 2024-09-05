import { FastifyReply, FastifyRequest } from 'fastify';
import { executeQuery } from '../db/db_conn';

// Fetch fuel_type from database or service
export const getfueltype = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const query = 'SELECT * FROM fuel_type';
        const fuel_type = await executeQuery(query);
        reply.send(fuel_type);
    } catch (e) {
        console.error(`Error fetching data from Database`, e);
        reply.code(500).send(`Error fetching data from Database`);
    }
};

// post new fueltype in database or service
export const postfueltype = async (request: FastifyRequest, reply: FastifyReply) => {
    const { fuel_name, fuel_price } = request.body as {
        fuel_name: string;
        fuel_price: string[];
    };

    try {
        const query = 'INSERT INTO fuel_type (fuel_name, fuel_price) VALUES ($1,$2) RETURNING *';
        const params = [fuel_name, fuel_price];
        const fuel_type = await executeQuery(query, params);
        reply.send(fuel_type);
    } catch (e) {
        console.error(`Error fetching data from Database`, e);
        reply.code(500).send(`Error fetching data from Database`);
    }
};

// patch new fueltype in database or service
export const patchfueltype = async (request: FastifyRequest, reply: FastifyReply) => {
    // Extract data from the request body
    const { id, fuel_name, fuel_price } = request.body as {
        id: number;
        fuel_name?: string;
        fuel_price?: string;
    };

    // Start building the query
    let query = 'UPDATE fuel_type SET ';
    const params: (string | number)[] = [];
    let setClause = '';

    // Dynamically build the SET clause based on provided fields
    if (fuel_name !== undefined) {
        setClause += `"fuel_name" = $${params.length + 1}, `;
        params.push(fuel_name);
    }
    if (fuel_price !== undefined) {
        setClause += `"fuel_price" = $${params.length + 1}, `;
        params.push(fuel_price);
    }
    params.push(id);

    // Remove the trailing comma and space from the SET clause
    setClause = setClause.slice(0, -2);
    query += setClause + ' WHERE id = $' + (params.length + 1) + ' RETURNING *;';

    try {
        const fuel_type = await executeQuery(query, params);
        reply.send(fuel_type);
    } catch (e) {
        console.error(`Error fetching data from Database`, e);
        reply.code(500).send(`Error fetching data from Database`);
    }
};

export const deletefueltype = async (request: FastifyRequest, reply: FastifyReply) => {
    // Fetch users from database or service
    const { id } = request.params as { id: number };

    try {
        const query = 'DELETE FROM fuel_type WHERE idfueltype = $1';
        const params = [id];
        const fuel_type = await executeQuery(query, params);
        reply.send(fuel_type);
    } catch (e) {
        console.error(`Error fetching data from Database`, e);
        reply.code(500).send(`Error fetching data from Database`);
    }
};
