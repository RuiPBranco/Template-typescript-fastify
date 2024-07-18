import { FastifyReply, FastifyRequest } from 'fastify';

export const getUsers = async (request: FastifyRequest, reply: FastifyReply) => {
    // Fetch users from database or service
    const users = [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Doe' }
    ];
    reply.send(users);
};

export const getUserById = async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: string };
    // Fetch user by ID from database or service
    const user = { id, name: 'John Doe' }; // Example response
    reply.send(user);
};
