import { Text, View, Pressable, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { hexToRgba } from '@/utils/filters';
import { Ionicons } from '@expo/vector-icons';

interface Params {
    name?: string;
    faction?: string;
    description?: string;
    color?: string;
}

export default function SpaceshipDetailScreen() {
    const { name, faction, description, color } = useLocalSearchParams() as Params;
    const router = useRouter();

    return (
        <View style={{ flex: 1 }}>
            <View
                style={{
                    padding: 16,
                    paddingTop: Platform.OS === 'ios' ? 56 : 16,
                    backgroundColor: color ? hexToRgba(color, 0.08) : '#fafafa',
                    borderBottomWidth: 1,
                    borderColor: '#eee',
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
            >
                <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 20, fontWeight: '700' }}>{name}</Text>
                    <Text style={{ color: '#666', marginTop: 4 }}>{faction}</Text>
                </View>
            </View>

            <View style={{ padding: 16 }}>
                <View
                    style={{
                        paddingVertical: 8,
                        paddingHorizontal: 12,
                        borderRadius: 16,
                        backgroundColor: color ? hexToRgba(color, 0.12) : '#f0f0f0',
                        alignSelf: 'flex-start',
                        marginBottom: 12,
                    }}
                >
                    <Text style={{ color: color ?? '#333', fontWeight: '600' }}>{faction}</Text>
                </View>

                <Text style={{ color: '#444', lineHeight: 20 }}>{description}</Text>
            </View>
        </View>
    );
}
