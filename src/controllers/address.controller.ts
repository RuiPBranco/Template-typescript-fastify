import { FastifyReply, FastifyRequest } from 'fastify';
import { executeQuery } from '../db/db_conn';

export const getaddress = async (request: FastifyRequest, reply: FastifyReply) => {
    // Fetch poi from database or service
    try {
        const query = 'SELECT * FROM address';
        const address = await executeQuery(query);
        reply.send(address);
    } catch (e) {
        console.error(`Error fetching data from Database`, e);
        reply.code(500).send(`Error fetching data from Database`);
    }
};

// post new address in database or service
export const postaddress = async (request: FastifyRequest, reply: FastifyReply) => {
    const { country, zip_code, city, street, house_number } = request.body as {
        country: string;
        zip_code: string;
        city: string;
        street: string;
        house_number: string;
    };

    try {
        const query = 'INSERT INTO address (country, zip_code, city, street, house_number) VALUES ($1,$2,$3,$4,$5) RETURNING *';
        const params = [country, zip_code, city, street, house_number];
        const address = await executeQuery(query, params);
        reply.send(address);
    } catch (e) {
        console.error(`Error fetching data from Database`, e);
        reply.code(500).send(`Error fetching data from Database`);
    }
};

// patch new address in database or service
export const patchaddress = async (request: FastifyRequest, reply: FastifyReply) => {
    // Extract data from the request body
    const { id, country, zip_code, city, street, house_number } = request.body as {
        id: number;
        country?: string;
        zip_code?: string;
        city?: string;
        street?: string;
        house_number?: string;
    };

    // Start building the query
    let query = 'UPDATE address SET ';
    const params: (string | number)[] = [];
    let setClause = '';

    // Dynamically build the SET clause based on provided fields
    if (country !== undefined) {
        setClause += `"country" = $${params.length + 1}, `;
        params.push(country);
    }
    if (zip_code !== undefined) {
        setClause += `"zip_code" = $${params.length + 1}, `;
        params.push(zip_code);
    }
    if (city !== undefined) {
        setClause += `"city" = $${params.length + 1}, `;
        params.push(city);
    }
    if (street !== undefined) {
        setClause += `"street" = $${params.length + 1}, `;
        params.push(street);
    }
    if (house_number !== undefined) {
        setClause += `"house_number" = $${params.length + 1}, `;
        params.push(house_number);
    }
    params.push(id);

    // Remove the trailing comma and space from the SET clause
    setClause = setClause.slice(0, -2);
    query += setClause + ' WHERE id = $' + (params.length + 1) + ' RETURNING *;';

    try {
        const poi = await executeQuery(query, params);
        reply.send(poi);
    } catch (e) {
        console.error(`Error fetching data from Database`, e);
        reply.code(500).send(`Error fetching data from Database`);
    }
};

export const deleteaddress = async (request: FastifyRequest, reply: FastifyReply) => {
    // Fetch users from database or service
    const { id } = request.params as { id: number };

    try {
        const query = 'DELETE FROM address WHERE idaddress = $1';
        const params = [id];
        const poi = await executeQuery(query, params);
        reply.send(poi);
    } catch (e) {
        console.error(`Error fetching data from Database`, e);
        reply.code(500).send(`Error fetching data from Database`);
    }
};
