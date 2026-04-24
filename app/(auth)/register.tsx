import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';
import { Ionicons } from '@expo/vector-icons';

export default function Register() {
  const router = useRouter();

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="person-add-outline" size={50} color={Colors.text} />
        <Text style={styles.title}>Criar conta</Text>
        <Text style={styles.subtitle}>Entre para o Cophee!</Text>
      </View>

      {/* Form */}
      <View style={styles.card}>
        <Input icon="person-outline" placeholder="Nome" />
        <Input icon="mail-outline" placeholder="Email" />
        <Input icon="lock-closed-outline" placeholder="Senha" secure />

        <Pressable
          style={styles.button}
          onPress={() => router.replace('/home')}
        >
          <Text style={styles.buttonText}>Cadastrar</Text>
        </Pressable>

        <Pressable onPress={() => router.back()}>
          <Text style={styles.link}>Já tenho conta</Text>
        </Pressable>
      </View>

    </View>
  );
}

function Input({ icon, placeholder, secure = false }) {
  return (
    <View style={styles.input}>
      <Ionicons name={icon} size={18} color={Colors.textLight} />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={Colors.textLight}
        secureTextEntry={secure}
        style={{ flex: 1, color: Colors.text }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    padding: 20,
  },

  header: {
    alignItems: 'center',
    marginBottom: 30,
  },

  title: {
    fontSize: 26,
    fontWeight: '700',
    color: Colors.text,
  },

  subtitle: {
    color: Colors.textLight,
  },

  card: {
    backgroundColor: Colors.backgroundDark,
    borderRadius: 16,
    padding: 20,
  },

  input: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: Colors.textLight + '40',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },

  button: {
    backgroundColor: Colors.accent,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },

  link: {
    textAlign: 'center',
    marginTop: 10,
    color: Colors.textLight,
  },
});
