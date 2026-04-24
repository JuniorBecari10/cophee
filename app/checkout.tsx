import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native';
import { Colors } from '../constants/colors';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function Checkout() {
  const router = useRouter();
  const [method, setMethod] = useState('pix');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pagamento</Text>

      {/* METHODS */}
      <View style={styles.card}>
        {['pix', 'credito', 'debito'].map((m) => (
          <Pressable
            key={m}
            style={[styles.option, method === m && styles.optionActive]}
            onPress={() => setMethod(m)}
          >
            <Text style={styles.optionText}>{m.toUpperCase()}</Text>
          </Pressable>
        ))}
      </View>

      {/* FAKE INPUT */}
      <View style={styles.card}>
        <Text style={styles.label}>Dados</Text>
        <TextInput
          placeholder="Número / chave Pix"
          placeholderTextColor={Colors.textLight}
          style={styles.input}
        />
      </View>

      <Pressable
        style={styles.button}
        onPress={() => {
          const orderId = Math.floor(Math.random() * 10000);
          router.replace(`/status?order=${orderId}`);
        }}
      >
        <Text style={{ color: '#fff' }}>Confirmar pagamento</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.background,
  },

  title: {
    fontSize: 22,
    color: Colors.text,
    marginBottom: 20,
  },

  card: {
    backgroundColor: Colors.backgroundDark,
    borderRadius: 16,
    padding: 15,
    marginBottom: 15,
  },

  option: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.textLight + '40',
  },

  optionActive: {
    backgroundColor: Colors.accent,
  },

  optionText: {
    color: Colors.text,
  },

  label: {
    color: Colors.textLight,
    marginBottom: 6,
  },

  input: {
    borderWidth: 1,
    borderColor: Colors.textLight + '40',
    borderRadius: 10,
    padding: 10,
    color: Colors.text,
  },

  button: {
    backgroundColor: Colors.accent,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
});
