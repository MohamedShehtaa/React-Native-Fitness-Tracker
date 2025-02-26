import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolWeight } from 'expo-symbols';
import React from 'react';
import { OpaqueColorValue, StyleProp, TextStyle } from 'react-native';

const MAPPING = {
  // SF Symbols (iOS) : Material Icons (Android)
  'house.fill': 'home',
  'person.circle.fill': 'person',
  'waveform.path.ecg': 'show-chart',
  calendar: 'date-range',
  'camera.shutter.button': 'add-a-photo',
  'play.circle.fill': 'play-circle',
  'stop.circle.fill': 'stop-circle',
  'pause.circle.fill': 'pause-circle',
  'figure.run': 'directions-run',
  'figure.walk': 'directions-walk',
  bicycle: 'directions-bike',
  dumbbell: 'fitness-center',
} as Partial<
  Record<
    import('expo-symbols').SymbolViewProps['name'],
    React.ComponentProps<typeof MaterialIcons>['name']
  >
>;

export type IconSymbolName = keyof typeof MAPPING;

export function IconSymbol({
  name,
  size = 24,
  color = '',
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color?: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  return (
    <MaterialIcons
      color={color}
      size={size}
      name={MAPPING[name]}
      style={style}
    />
  );
}
