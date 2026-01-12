import React from 'react';
import { Pressable, Text, View } from 'react-native';

interface Props {
  label: string;
  selected?: boolean;
  color?: string;
  onPress?: () => void;
}

export function FilterButton({ label, selected, color, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginRight: 8,
        borderRadius: 16,
        backgroundColor: selected ? '#333' : pressed ? '#eee' : '#f0f0f0',
        flexDirection: 'row',
        alignItems: 'center',
      })}
    >
      {color ? (
        <View
          style={{
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: color,
            marginRight: 8,
          }}
        />
      ) : null}
      <Text style={{ color: selected ? '#fff' : '#333' }}>{label}</Text>
    </Pressable>
  );
}

export default FilterButton;
