import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';

type Variant = 'title' | 'subtitle' | 'body' | 'label' | 'muted';

interface Props extends TextProps {
  variant?: Variant;
  color?: string;
}

export function Typography({ variant = 'body', color, style, children, ...rest }: Props) {
  const variantStyle = styles[variant] || styles.body;
  return (
    <Text {...rest} style={[variantStyle, color ? { color } : undefined, style]}> 
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 18, fontWeight: '800' },
  subtitle: { fontSize: 14, fontWeight: '700' },
  body: { fontSize: 16, lineHeight: 20 },
  label: { fontSize: 13, fontWeight: '700' },
  muted: { fontSize: 13, color: '#777' },
});

export default Typography;
