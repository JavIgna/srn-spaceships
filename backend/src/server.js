import app from './app.js';

const PORT = process.env.PORT || 3000;


// Application entry point.
// Starts the HTTP server and listens for incoming requests.
app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
