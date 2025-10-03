import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator, type BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Dashboard from '../../../features/dashboard/screens';
import ProfilePage from '../../../features/profile/screens/ProfileScreen';
import TransactionsPage from '../../../features/transactions/screens';
import { useTheme } from '../../store/theme';

export type RootTabParamList = {
  Dashboard: undefined;
  Transactions: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<any>();

const CustomHeader: React.FC<{ title: string }> = ({ title }) => {
  const { colors } = useTheme();
  return (
    <View style={[styles.headerContainer, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
      <Text style={[styles.headerTitle, { color: colors.text }]}>{title}</Text>
    </View>
  );
}

const AppNavigator: React.FC = () => {
  const { theme, colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName: any;
          if (route.name === 'Inicio') iconName = 'dashboard';
          else if (route.name === 'Transações') iconName = 'compare-arrows';
          else if (route.name === 'Perfil') iconName = 'settings';
          else iconName = 'dashboard';

          return <MaterialIcons name={iconName} size={26} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          position: 'absolute',
          bottom: 30,
          left: 20,
          right: 20,
          backgroundColor: 'transparent',
          borderRadius: 20,
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
          borderTopWidth: 0,
          borderWidth: 1,
          borderColor: colors.glassBorder,
          elevation: 0,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        header: (headerProps: BottomTabHeaderProps) => <CustomHeader title={headerProps.options.title || headerProps.route.name} />,

        tabBarBackground: () => (
          <BlurView
            tint={theme === 'dark' ? 'dark' : 'light'}
            intensity={90}
            style={{
              ...StyleSheet.absoluteFillObject,
              borderRadius: 20,
              overflow: 'hidden',
            }}
          />
        ),
      })}
    >
      <Tab.Screen name='Incio' component={Dashboard} />
      <Tab.Screen name="Transações" component={TransactionsPage} />
      <Tab.Screen name="Perfil" component={ProfilePage} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: 48,
    paddingBottom: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  }
});

export default AppNavigator;