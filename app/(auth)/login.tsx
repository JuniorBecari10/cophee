import { TextInput, Button } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen, Title } from '../../components/Themed';
import { Colors } from '../../constants/colors';

export default function Login() {
  const router = useRouter();

  return (
    <Screen>
      <Title>Login</Title>

      <TextInput
        placeholder="Email"
        placeholderTextColor={Colors.textLight}
        style={{
          borderWidth: 1,
          borderColor: Colors.backgroundDark,
          padding: 10,
          borderRadius: 8,
          marginBottom: 10,
          color: Colors.text,
        }}
      />

      <TextInput
        placeholder="Senha"
        placeholderTextColor={Colors.textLight}
        secureTextEntry
        style={{
          borderWidth: 1,
          borderColor: Colors.backgroundDark,
          padding: 10,
          borderRadius: 8,
          marginBottom: 20,
          color: Colors.text,
        }}
      />

      <Button title="Entrar" color={Colors.accent} onPress={() => router.replace('/')} />
      <Button title="Cadastrar" onPress={() => router.push('/register')} />
    </Screen>
  );
}
