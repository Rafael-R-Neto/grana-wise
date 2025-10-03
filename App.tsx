import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './src/shared/components/navigation/RootNavigator';
import { AuthProvider } from './src/shared/store/auth';
import { ThemeProvider } from './src/shared/store/theme';

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <ThemeProvider>
          <RootNavigator />
        </ThemeProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
};

export default App;
