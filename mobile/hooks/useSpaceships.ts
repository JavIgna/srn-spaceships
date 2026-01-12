import { useEffect, useState } from 'react';
import { Spaceship } from '@/models/Spaceship';
import { fetchSpaceships } from '@/services/spaceshipsService';

export function useSpaceships() {
    const [data, setData] = useState<Spaceship[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchSpaceships()
            .then(setData)
            .catch(() => setError('Error loading spaceships'))
            .finally(() => setLoading(false));
    }, []);

    return { data, loading, error };
}
