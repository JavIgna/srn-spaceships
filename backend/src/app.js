import express from 'express';
import cors from 'cors';

// Express application configuration.
// This file is responsible for middleware setup and route registration.

const app = express();

// Enable CORS to allow the mobile app to consume the API from a different origin
app.use(cors());
app.use(express.json());

// Root endpoint to verify API availability
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the Spaceships API!' });
});

export default app;