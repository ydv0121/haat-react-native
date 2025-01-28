import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { LoaderProvider } from 'context/LoaderContext';
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from 'react-native-reanimated';
import Loader from 'components/Loader';
import { LanguageProvider } from 'context/LanguageContext';

const queryClient = new QueryClient();
SplashScreen.preventAutoHideAsync();

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: true,
});
export default function RootLayout() {
  const [loaded] = useFonts({
    SourceSans3Bold: require('../assets/fonts/SourceSans3-Bold.ttf'),
    SourceSans3SemiBold: require('../assets/fonts/SourceSans3-SemiBold.ttf'),
    SourceSans3Medium: require('../assets/fonts/SourceSans3-Medium.ttf'),
    SourceSans3Regular: require('../assets/fonts/SourceSans3-Regular.ttf'),
    RobotoBold: require('../assets/fonts/Roboto-Bold.ttf'),
    RobotoLight: require('../assets/fonts/Roboto-Light.ttf'),
    RobotoMedium: require('../assets/fonts/Roboto-Medium.ttf'),
    RobotoSemiBold: require('../assets/fonts/Roboto-SemiBold.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView>
      <QueryClientProvider client={queryClient}>
        <LanguageProvider>
          <LoaderProvider>
            <Stack>
              <Stack.Screen name="(market)" options={{ headerShown: false }} />
              <Stack.Screen name="category/[id]" options={{
                headerShown: false
              }} />
            </Stack>
            <Loader />
          </LoaderProvider>
        </LanguageProvider>
        <StatusBar style="dark" />
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
