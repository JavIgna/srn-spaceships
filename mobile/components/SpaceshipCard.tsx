import { Pressable, View, Platform } from 'react-native';
import { Spaceship } from '@/models/Spaceship';
import { Ionicons } from '@expo/vector-icons';
import { hexToRgba } from '@/utils/filters';
import Typography from './Typography';
import Avatar from './Avatar';

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
          <Avatar label={spaceship.name} size={48} backgroundColor={color ? hexToRgba(color, 0.12) : undefined} color={color ?? '#666'} />
        </View>

        <View style={{ flex: 1 }}>
          <Typography variant="title">{spaceship.name}</Typography>

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
              <Typography variant="label" color={color ?? '#666'}>{spaceship.faction}</Typography>
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
