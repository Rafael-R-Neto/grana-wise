import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../../../features/auth/screens/LoginScreen';
import RegisterScreen from '../../../features/auth/screens/RegisterScreen';
import { useAuth } from '../../store/auth';
import AppNavigator from './AppNavigation';


const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const { isLoggedIn } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        <Stack.Screen name="MainApp" component={AppNavigator} />
      ) : (
        <Stack.Group>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;