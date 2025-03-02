import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { useOrientation } from '@/hooks/useOrientation';
import { HapticTab } from '@/components/ui/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeader from '@/components/Shared/ScreenTitle';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { isLandscape } = useOrientation();

  return (
    <SafeAreaView
      style={{ flex: 1 }}
      edges={isLandscape ? ['left', 'right'] : ['top']}
    >
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              position: isLandscape ? 'absolute' : 'relative',
              bottom: isLandscape ? 0 : undefined,
              height: isLandscape ? 60 : 80,
            },
            android: {
              height: isLandscape ? 60 : 80,
            },
          }),
          tabBarItemStyle: {
            paddingVertical: isLandscape ? 4 : 8,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="house.fill" color={color} />
            ),
            header: (props) => (
              <ScreenHeader
                title={props.options.title}
                orientation={isLandscape ? 'landscape' : 'portrait'}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="activity"
          options={{
            title: 'Activity',
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="waveform.path.ecg" color={color} />
            ),
            header: (props) => (
              <ScreenHeader
                title={props.options.title}
                orientation={isLandscape ? 'landscape' : 'portrait'}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="history"
          options={{
            title: 'History',
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="calendar" color={color} />
            ),
            header: (props) => (
              <ScreenHeader
                title={props.options.title}
                orientation={isLandscape ? 'landscape' : 'portrait'}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="person.circle.fill" color={color} />
            ),
            header: (props) => (
              <ScreenHeader
                title={props.options.title}
                orientation={isLandscape ? 'landscape' : 'portrait'}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="gearshape.fill" color={color} />
            ),
            header: (props) => (
              <ScreenHeader
                title={props.options.title}
                orientation={isLandscape ? 'landscape' : 'portrait'}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="reminder-settings"
          options={{
            title: 'Reminder Settings',
            href: null,
            headerShown: true,
            headerStyle: {
              backgroundColor: Colors[colorScheme ?? 'light'].background,
            },
            headerTintColor: Colors[colorScheme ?? 'light'].tint,
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
