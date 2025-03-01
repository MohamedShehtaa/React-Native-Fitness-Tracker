import { useOrientation } from '@/hooks/useOrientation';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ScrollViewProps,
  View,
  ViewStyle,
  useWindowDimensions,
} from 'react-native';

interface ScrollableViewProps extends ScrollViewProps {
  children: React.ReactNode;
  minHeight?: number;
  style?: ViewStyle;
}

const ScrollableView = ({
  children,
  minHeight = 800,
  style,
  ...props
}: ScrollableViewProps) => {
  const { isLandscape } = useOrientation();
  const { width, height } = useWindowDimensions();
  const screenIsLandscape = width > height;
  const finalIsLandscape = isLandscape || screenIsLandscape;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[{ padding: 16, width: '100%' }, style]}
      keyboardVerticalOffset={Platform.select({ ios: 100, android: 0 })}
    >
      {finalIsLandscape ? (
        <ScrollView
          {...props}
          nestedScrollEnabled={true}
          contentContainerStyle={[
            props.contentContainerStyle,
            {
              flexGrow: 1,
              paddingBottom: 40,
              minHeight: minHeight,
            },
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={finalIsLandscape}
          showsHorizontalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      ) : (
        <View style={{ flex: 1 }}>{children}</View>
      )}
    </KeyboardAvoidingView>
  );
};

export default ScrollableView;
