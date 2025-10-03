import React from 'react';
import { KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon } from '../../../../shared/components/Icon';
import { useAuth } from '../../../../shared/store/auth';
import { useTheme } from '../../../../shared/store/theme';
import { styles } from './styles';

const LoginScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { colors } = useTheme();
  const { login } = useAuth();
  const s = styles(colors);

  return (
    <SafeAreaView style={s.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={s.content}>
        <View style={s.header}>
          <Text style={s.title}>Bem vindo de volta!</Text>
          <Text style={s.subtitle}>Entre para gerenciar suas finanças</Text>
        </View>

        <View style={s.form}>
          <View>
            <Text style={s.label}>Email</Text>
            <TextInput
              style={s.input}
              placeholder="you@example.com"
              placeholderTextColor={colors.textSecondary}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View>
            <Text style={s.label}>Senha</Text>
            <TextInput
              style={s.input}
              placeholder="••••••••"
              placeholderTextColor={colors.textSecondary}
              secureTextEntry
            />
            <TouchableOpacity>
              <Text style={s.forgotPassword}>Esqueceu a senha?</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={s.button} onPress={login}>
            <Text style={s.buttonText}>Entrar</Text>
          </TouchableOpacity>
        </View>

        <View style={s.socialContainer}>
          <Text style={s.socialText}>Ou continue com</Text>
          <View style={s.socialButtons}>
            <TouchableOpacity style={s.socialButton}>
              <Icon name="google" width={24} height={24} fill="#DB4437" />
            </TouchableOpacity>
            <TouchableOpacity style={s.socialButton}>
              <Icon name="apple" width={24} height={24} fill={colors.text} />
            </TouchableOpacity>
            <TouchableOpacity style={s.socialButton}>
              <Icon name="facebook" width={24} height={24} fill="#4267B2" />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={s.footer} onPress={() => navigation.navigate('Register')}>
          <Text style={{ color: colors.textSecondary }}>
            Não tem um conta? <Text style={{ color: colors.primary, fontWeight: 'bold' }}>Cadastrar</Text>
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;