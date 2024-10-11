import { FastifyReply, FastifyRequest } from 'fastify';
import { executeQuery } from '../db/db_conn';

export const getpump = async (request: FastifyRequest, reply: FastifyReply) => {
    // Fetch poi from database or service
    try {
        const query = 'SELECT * FROM pump';
        const pump = await executeQuery(query);
        reply.send(pump);
    } catch (e) {
        console.error(`Error fetching data from Database`, e);
        reply.code(500).send(`Error fetching data from Database`);
    }
};

// post new address in database or service
export const postpump = async (request: FastifyRequest, reply: FastifyReply) => {
    const { pump_name, idfueltype, idpetrol_station } = request.body as {
        pump_name: string;
        idfueltype: number;
        idpetrol_station: number;
    };

    try {
        const query = 'INSERT INTO pump (pump_name, idfueltype, idpetrol_station) VALUES ($1,$2,$3) RETURNING *';
        const params = [pump_name, idfueltype, idpetrol_station];
        const pump = await executeQuery(query, params);
        reply.send(pump);
    } catch (e) {
        console.error(`Error fetching data from Database`, e);
        reply.code(500).send(`Error fetching data from Database`);
    }
};

// patch new pump in database or service
export const patchpump = async (request: FastifyRequest, reply: FastifyReply) => {
    // Extract data from the request body
    const { pump_name, idfueltype, idpetrol_station, id } = request.body as {
        pump_name?: string;
        idfueltype?: string;
        idpetrol_station?: string;
        id: number;
    };

    // Start building the query
    let query = 'UPDATE pump SET ';
    const params: (string | number)[] = [];
    let setClause = '';

    // Dynamically build the SET clause based on provided fields
    if (pump_name !== undefined) {
        setClause += `"pump_name" = $${params.length + 1}, `;
        params.push(pump_name);
    }
    if (idfueltype !== undefined) {
        setClause += `"idfueltype" = $${params.length + 1}, `;
        params.push(idfueltype);
    }
    if (idpetrol_station !== undefined) {
        setClause += `"idpetrol_station" = $${params.length + 1}, `;
        params.push(idpetrol_station);
    }
    params.push(id);

    // Remove the trailing comma and space from the SET clause
    setClause = setClause.slice(0, -2);
    query += setClause + ' WHERE id = $' + (params.length + 1) + ' RETURNING *;';

    try {
        const pump = await executeQuery(query, params);
        reply.send(pump);
    } catch (e) {
        console.error(`Error fetching data from Database`, e);
        reply.code(500).send(`Error fetching data from Database`);
    }
};

export const deletepump = async (request: FastifyRequest, reply: FastifyReply) => {
    // Fetch users from database or service
    const { id } = request.params as { id: number };

    try {
        const query = 'DELETE FROM pump WHERE idpump = $1';
        const params = [id];
        const pump = await executeQuery(query, params);
        reply.send(pump);
    } catch (e) {
        console.error(`Error fetching data from Database`, e);
        reply.code(500).send(`Error fetching data from Database`);
    }
};
