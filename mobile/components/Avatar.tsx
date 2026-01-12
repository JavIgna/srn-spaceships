import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  label: string;
  size?: number;
  backgroundColor?: string;
  color?: string;
}

export function Avatar({ label, size = 48, backgroundColor, color = '#666' }: Props) {
  const fontSize = Math.round(size / 2.8);
  return (
    <View style={[styles.container, { width: size, height: size, borderRadius: size / 2, backgroundColor }]}>
      <Text style={[styles.text, { fontSize, color }]}>{label.charAt(0).toUpperCase()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center' },
  text: { fontWeight: '700' },
});

export default Avatar;
