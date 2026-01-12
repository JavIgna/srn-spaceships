import { Pressable, Text, View, Platform } from 'react-native';
import { Spaceship } from '@/models/Spaceship';
import { Ionicons } from '@expo/vector-icons';
import { hexToRgba } from '@/utils/filters';

interface Props {
  spaceship: Spaceship;
  onPress?: () => void;
  color?: string;
}

export function SpaceshipCard({ spaceship, onPress, color }: Props) {
  return (
    <Pressable onPress={onPress}>
      <View
        style={{
          marginHorizontal: 12,
          marginVertical: 8,
          padding: 16,
          borderRadius: 12,
          backgroundColor: '#fff',
          flexDirection: 'row',
          alignItems: 'center',
          ...Platform.select({
            ios: {
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.08,
              shadowRadius: 6,
            },
            android: {
              elevation: 2,
            },
          }),
        }}
      >
        <View style={{ marginRight: 12, alignItems: 'center' }}>
          <View
            style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: color ? hexToRgba(color, 0.12) : undefined,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: '700', color: color ?? '#666' }}>
              {spaceship.name.charAt(0).toUpperCase()}
            </Text>
          </View>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 16, fontWeight: '700' }}>{spaceship.name}</Text>

          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
            <View
              style={{
                paddingVertical: 6,
                paddingHorizontal: 10,
                borderRadius: 16,
                marginRight: 8,
                backgroundColor: color ? hexToRgba(color, 0.12) : undefined,
              }}
            >
              <Text style={{ color: color ?? '#666', fontWeight: '600' }}>{spaceship.faction}</Text>
            </View>
          </View>
        </View>

        <View style={{ marginLeft: 8 }}>
          <Ionicons name="chevron-forward" size={22} color="#999" />
        </View>
      </View>
    </Pressable>
  );
}
