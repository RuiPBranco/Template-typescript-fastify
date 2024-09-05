import { FastifyInstance } from 'fastify';
import { API_NAME } from '../config/config';
import poiRoutes from './poi.route';
import addressRoutes from './address.route';
import petrol_stationRoutes from './petrolstation.route';
import fueltypeRoutes from './fueltype.route';

// Register all routes with the respective prefixs
export const routes = async (app: FastifyInstance) => {
    app.register(poiRoutes, { prefix: `/${API_NAME}/poi` });
    app.register(addressRoutes, { prefix: `/${API_NAME}/address` });
    app.register(petrol_stationRoutes, { prefix: `/${API_NAME}/petrol_station` });
    app.register(fueltypeRoutes, { prefix: `/${API_NAME}/fuel_type` });
};
