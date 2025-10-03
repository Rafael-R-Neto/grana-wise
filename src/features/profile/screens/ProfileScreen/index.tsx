import React from 'react';
import { Image, ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../../../shared/store/auth';
import { useTheme } from '../../../../shared/store/theme';
import { styles } from './styles';

// THEME TOGGLE
const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme, colors } = useTheme();
  const isDark = theme === 'dark';
  const s = styles(colors);

  return (
    <View style={s.settingItem}>
      <Text style={s.settingText}>Dark Mode</Text>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isDark ? colors.primary : "#f4f3f4"}
        onValueChange={toggleTheme}
        value={isDark}
      />
    </View>
  );
};

// PROFILE PAGE
const ProfilePage: React.FC = () => {
  const { colors } = useTheme();
  const { logout } = useAuth();
  const s = styles(colors);

  return (
    <ScrollView
      style={s.container}
      contentContainerStyle={s.contentContainer}
    >
      <View style={s.profileHeader}>
        <Image
          source={{ uri: "https://i.pravatar.cc/150?u=leo" }}
          style={s.avatar}
        />
        <Text style={s.userName}>Rafael Neto</Text>
        <Text style={s.userEmail}>rafael.neto@example.com</Text>
      </View>

      <View style={s.settingsSection}>
        <Text style={s.sectionTitle}>Configurações</Text>
        <ThemeToggle />

        <TouchableOpacity style={s.settingItem}>
          <Text style={s.settingText}>Informações da conta</Text>
        </TouchableOpacity>

        <TouchableOpacity style={s.settingItem}>
          <Text style={s.settingText}>Privacidade & Segurança</Text>
        </TouchableOpacity>
      </View>

      <View style={s.logoutSection}>
        <TouchableOpacity
          onPress={logout}
          style={s.logoutButton}
        >
          <Text style={s.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProfilePage;
