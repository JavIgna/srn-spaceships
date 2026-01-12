import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// fs is used instead of JSON import assertions to ensure
// better compatibility across Node.js versions
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.join(__dirname, '../data/spaceships.json');
const spaceships = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

// Returns the list of spaceships
export const getSpaceships = (req, res) => {
  res.status(200).json(spaceships);
};
