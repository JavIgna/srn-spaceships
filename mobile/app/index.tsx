import { FlatList, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSpaceships } from '@/hooks/useSpaceships';
import { SpaceshipCard } from '@/components/SpaceshipCard';

export default function HomeScreen() {
    const { data, loading, error } = useSpaceships();
    const router = useRouter();

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
                    <SpaceshipCard
                        spaceship={item}
                        onPress={() =>
                            router.push({
                                pathname: '/spaceship/[id]',
                                params: {
                                    id: item.id.toString(),
                                    name: item.name,
                                    faction: item.faction,
                                    description: item.description,
                                },
                            })
                        }
                    />
                )}
            />
        </View>
    );
}
