import { useEffect, useState } from 'react';
import { Spaceship } from '@/models/Spaceship';
import { fetchSpaceships } from '@/services/spaceshipsService';

export function useSpaceships() {
    const [data, setData] = useState<Spaceship[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [refreshing, setRefreshing] = useState(false);

    const load = async (isRefresh = false) => {
        try {
            if (isRefresh) setRefreshing(true);
            else setLoading(true);
            const res = await fetchSpaceships();
            setData(res);
            setError(null);
        } catch (e) {
            setError('Error loading spaceships');
        } finally {
            if (isRefresh) setRefreshing(false);
            else setLoading(false);
        }
    };

    useEffect(() => {
        load(false);
    }, []);

    const refetch = () => load(true);

    return { data, loading, error, refreshing, refetch };
}
