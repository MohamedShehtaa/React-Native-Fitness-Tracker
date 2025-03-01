import { View, Text, StyleSheet, Platform } from 'react-native';

type ScreenHeaderProps = {
  title?: string;
  orientation?: 'portrait' | 'landscape';
};

const ScreenHeader = ({ title, orientation }: ScreenHeaderProps) => (
  <View
    style={[styles.container, orientation === 'landscape' && styles.landscape]}
  >
    <Text
      style={[
        styles.title,
        orientation === 'landscape' && styles.landscapeTitle,
      ]}
    >
      {title}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 8,
    marginTop: Platform.OS === 'ios' ? 30 : 20,
  },
  landscape: {
    paddingHorizontal: 4,
    marginTop: Platform.OS === 'ios' ? 50 : 40,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  landscapeTitle: {
    fontSize: 24,
  },
});

export default ScreenHeader;
