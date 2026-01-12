import express from 'express';
import cors from 'cors';
import rootRoutes from './routes/root.routes.js';
import spaceshipsRoutes from './routes/spaceships.routes.js';

// Express application configuration.
// This file is responsible for middleware setup and route registration.
const app = express();

// Enable CORS to allow the mobile app to consume the API from a different origin
app.use(cors());
app.use(express.json());

// Register routes
app.use('/', rootRoutes);
app.use('/', spaceshipsRoutes);

export default app;