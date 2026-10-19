import '@/services/location/location-task.registry';

import { useEffect } from 'react';

import {
  BricolageGrotesque_400Regular,
  BricolageGrotesque_600SemiBold,
} from '@expo-google-fonts/bricolage-grotesque';
import { ChelseaMarket_400Regular } from '@expo-google-fonts/chelsea-market';
import { QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { useBootstrap } from '@/hooks/use-bootstrap';
import { useSyncPendingCheckIns } from '@/hooks/use-sync-pending-checkins';
import { queryClient } from '@/lib/query-client';

// Keep the splash screen visible while fonts load.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    ChelseaMarket: ChelseaMarket_400Regular,
    BricolageGrotesque: BricolageGrotesque_400Regular,
    BricolageGrotesqueSemiBold: BricolageGrotesque_600SemiBold,
  });

  useBootstrap();
  useSyncPendingCheckIns();

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <StatusBar style="light" />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="place" />
          <Stack.Screen name="explore" />
          <Stack.Screen name="index" />
        </Stack>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
