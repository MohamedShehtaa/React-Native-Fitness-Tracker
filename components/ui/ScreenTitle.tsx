import { Colors } from '@/constants/Colors';
import React from 'react';
import { View, Text, StyleSheet, Platform, useColorScheme } from 'react-native';

type ScreenHeaderProps = {
    title?: string
}
const ScreenHeader: React.FC<ScreenHeaderProps> = ({title}) => {
  const colorScheme = useColorScheme();

  return (
    <View
      style={[
        styles.header,
        {
          backgroundColor: colorScheme === 'light'? Colors.mainBackground : Colors['dark'].background,
        },
      ]}
    >
      <Text
        style={[
          styles.headerText,
          {
            color: Colors[colorScheme ?? 'light'].text,
          },
        ]}
      >
       {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop:Platform.OS === 'ios' ? 30 : 20,
    marginBottom:10,
    marginLeft:12,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
  },
});

export default ScreenHeader;