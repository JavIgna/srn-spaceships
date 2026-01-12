import { Pressable, Text, View } from 'react-native';
import { Spaceship } from '@/models/Spaceship';

interface Props {
  spaceship: Spaceship;
  onPress?: () => void;
}

export function SpaceshipCard({ spaceship, onPress }: Props) {
  return (
    <Pressable onPress={onPress}>
      <View
        style={{
          padding: 16,
          borderBottomWidth: 1,
          borderColor: '#ddd',
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: '600' }}>
          {spaceship.name}
        </Text>
        <Text style={{ color: '#666' }}>
          {spaceship.faction}
        </Text>
      </View>
    </Pressable>
  );
}
