# SRN Spaceships

Technical test for React Native Developer position.

## Project Overview
This project consists of a simple backend API built with Node.js and Express,
and a mobile application developed with React Native using Expo.

## Project Structure
- `/backend`: REST API (Node.js + Express)
- `/mobile`: Mobile application (React Native + Expo)

## Running the Backend (Docker)

From the `backend` directory, run:

```bash
docker-compose up --build
```

The API will be available at:

http://localhost:3000

The spaceships endpoint is:

http://localhost:3000/api/spaceships

## Technical Decisions

### Static Dataset Handling

The backend serves a static dataset stored as a JSON file.  
Instead of importing the JSON file using `import ... assert { type: 'json' }`,
the data is loaded using Node.js `fs` and `JSON.parse`.

Although JSON import assertions are supported in recent Node.js versions,
they may present compatibility issues across different Node versions and
execution environments (such as Docker or CI pipelines).

This approach ensures better stability, portability, and ease of execution
for reviewers and deployment environments. Since the dataset is static,
it is loaded once into memory to avoid unnecessary file system access.

This decision prioritizes reliability and maintainability over experimental features.