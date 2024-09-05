import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
    host: process.env.PGHOST || 'database',
    user: process.env.PGUSER || 'root',
    database: process.env.PGDATABASE || 'root',
    password: process.env.PGPASSWORD || 'root',
    port: Number(process.env.PGPORT) || 5432,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000
});

// Query DB
export const executeQuery = async (query: string, params: any[] = []): Promise<any> => {
    let client;
    try {
        client = await pool.connect();
        const result = await client.query(query, params);
        return result.rows.length > 0 ? result.rows : [];
    } catch (e) {
        console.error(`Error executing query`, e);
        throw new Error(`Error executing query`);
    } finally {
        if (client) {
            client.release();
        }
    }
};

export default pool;
