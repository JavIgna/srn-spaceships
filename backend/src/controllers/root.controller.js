// Root controller.
// Handles basic API availability responses.

export const getRoot = (req, res) => {
  res.status(200).json({ message: 'Welcome to the Spaceships API!' });
};
