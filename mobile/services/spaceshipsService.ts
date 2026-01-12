import { API_BASE_URL } from '@/constants/api';
import { Spaceship } from '@/models/Spaceship';

export async function fetchSpaceships(): Promise<Spaceship[]> {
    const response = await fetch(`${API_BASE_URL}/spaceships`);

    if (!response.ok) {
        throw new Error('Failed to fetch spaceships');
    }

    return response.json();
}
