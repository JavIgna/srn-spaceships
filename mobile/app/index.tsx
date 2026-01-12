import { FlatList, Text, View } from 'react-native';
import { useSpaceships } from '@/hooks/useSpaceships';
import { SpaceshipCard } from '@/components/SpaceshipCard';

export default function HomeScreen() {
    const { data, loading, error } = useSpaceships();

    if (loading) {
        return <Text style={{ padding: 16 }}>Loading...</Text>;
    }

    if (error) {
        return <Text style={{ padding: 16 }}>{error}</Text>;
    }

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <SpaceshipCard spaceship={item} />
                )}
            />
        </View>
    );
}
