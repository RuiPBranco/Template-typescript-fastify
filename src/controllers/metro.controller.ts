import { FastifyReply, FastifyRequest } from 'fastify';
import { executeQuery } from '../db/db_conn';
import axios, { AxiosResponse } from 'axios';
import { resolve } from 'path';

// Interfaces that will ensure respost structure from axios
// Interface for the stop object
interface Stop {
    stop_id: string;
    stop_name: string;
    stop_lat: string;
    stop_lon: string;
    stop_url: string[];
    linha: string[];
    zone_id: string;
}

// Interface for the entire response object
interface ApiResponse {
    resposta: Stop[];
}

interface Article {
    userId: number;
    id: number;
    title: string;
    body: string;
    link: string;
    comment_count: number;
}

interface OAuthTokenResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
    scope?: string;
}

async function getAccessToken(clientId: string, clientSecret: string, tokenUrl: string): Promise<string> {
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    params.append('client_id', clientId);
    params.append('client_secret', clientSecret);

    try {
        const response: AxiosResponse<OAuthTokenResponse> = await axios.post<OAuthTokenResponse>(tokenUrl, params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return response.data.access_token;
    } catch (error) {
        console.error('Error obtaining access token:', error);
        throw new Error('Failed to obtain access token');
    }
}

async function fetchProtectedData(apiUrl: string, accessToken: string) {
    try {
        const response = await axios.get(apiUrl, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching protected data:', error);
        throw new Error('Failed to fetch protected data');
    }
}

// // Get data for Metro Position
// async function fetchStops(): Promise<ApiResponse> {
//     const clientId = 'U1jDUURaZUJZJV7d02lArCTyJxYa';
//     const clientSecret = 'I7A5hV7BW8E7zNzVv4OCDwFNs78a';
//     // const accessToken = '3d62eb05-3836-306f-a50e-c26743af708a';
//     const tokenUrl = 'https://api.metrolisboa.pt:8243/estadoServicoML/1.0.1/infoEstacao/todos'; // Replace with the actual token URL
//     const apiUrl = 'https://api.metrolisboa.pt:8243/estadoServicoML/1.0.1/infoEstacao/todos'; // Replace with the actual API URL

//     try {
//         // Step 1: Obtain the access token
//         const accessToken = await getAccessToken(clientId, clientSecret, tokenUrl);
//         console.log('Access Token:', accessToken);

//         // Step 2: Use the access token to fetch protected data
//         const data = await fetchProtectedData(apiUrl, accessToken);
//         console.log('Protected Data:', data);
//         return data.data;
//     } catch (error) {
//         console.error('Error in main process:', error);
//         throw new Error('Condition not met');
//     }

//     // const response = await axios.get<ApiResponse>('https://api.metrolisboa.pt:8243/estadoServicoML/1.0.1/infoEstacao/todos');
//     // return response.data;
// }

// Get data for Metro Position
async function fetchStops(): Promise<Article[]> {
    // const clientId = 'U1jDUURaZUJZJV7d02lArCTyJxYa';
    // const clientSecret = 'I7A5hV7BW8E7zNzVv4OCDwFNs78a';
    // // const accessToken = '3d62eb05-3836-306f-a50e-c26743af708a';
    // const tokenUrl = 'https://api.metrolisboa.pt:8243/estadoServicoML/1.0.1/infoEstacao/todos'; // Replace with the actual token URL
    const apiUrl = 'https://dummy-json.mock.beeceptor.com/posts';

    try {
        // Step 1: Obtain the access token
        // const accessToken = await getAccessToken(clientId, clientSecret, tokenUrl);
        // console.log('Access Token:', accessToken);

        // Step 2: Use the access token to fetch protected data
        // const data = await fetchProtectedData(apiUrl, accessToken);

        const response = await axios.get<Article[]>(apiUrl, {
            // headers: {
            //     Authorization: `Bearer ${accessToken}`
            // }
        });

        console.log('Protected Data:', response);
        return response.data;
    } catch (error) {
        console.error('Error in main process:', error);
        throw new Error('Condition not met');
    }

    // const response = await axios.get<ApiResponse>('https://api.metrolisboa.pt:8243/estadoServicoML/1.0.1/infoEstacao/todos');
    // return response.data;
}

export const getMetroPos = async (request: FastifyRequest, reply: FastifyReply) => {
    // Fetch users from database or service
    try {
        // Use await to ensure the data is fetched before continuing
        const data = await fetchStops();

        // Assuming data is an array of stops or articles, you can log or process each stop
        data.forEach((article) => {
            console.log(article.userId); // Or any other property of article you want to log
            // console.log(`Stop Name: ${stop.stop_name}, Lines: ${stop.linha}`); // Example for another dataset
        });

        // const query = 'SELECT * FROM users';
        // const users = await executeQuery(query);
        reply.send(data);
    } catch (e) {
        console.error(`Error fetching data from Database`, e);
        reply.code(500).send(`Error fetching data from Database`);
    }
};
