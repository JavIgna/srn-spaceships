import { Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

interface Params {
    name?: string;
    faction?: string;
    description?: string;
}

export default function SpaceshipDetailScreen() {
    const { name, faction, description } =
        useLocalSearchParams() as Params;

    return (
        <View style={{ flex: 1, padding: 16 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                {name}
            </Text>

            <Text style={{ marginVertical: 8, color: '#666' }}>
                Faction: {faction}
            </Text>

            <Text>{description}</Text>
        </View>
    );
}
