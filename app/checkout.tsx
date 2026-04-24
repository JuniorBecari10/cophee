import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Colors } from '../constants/colors';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function Checkout() {
  const router = useRouter();
  const [method, setMethod] = useState('Pix');

  return (
    <View style={styles.container}>
      
      <Text style={styles.header}>Pagamento</Text>

      <View style={styles.card}>
        {['Pix', 'Crédito', 'Débito'].map((m) => (
          <Pressable
            key={m}
            style={[styles.option, method === m && styles.optionActive]}
            onPress={() => setMethod(m)}
          >
            <Text
              style={[
                styles.optionText,
                method === m && styles.optionTextActive,
              ]}
            >
              {m}
            </Text>
          </Pressable>
        ))}
      </View>

      <Pressable
        style={styles.button}
        onPress={() => {
          const orderId = Math.floor(Math.random() * 10000);
          router.replace(`/status?order=${orderId}`);
        }}
      >
        <Text style={styles.buttonText}>Confirmar pagamento</Text>
      </Pressable>
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>Voltar</Text>
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

  header: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 20,
    paddingTop: 10,
  },

  card: {
    backgroundColor: Colors.backgroundDark,
    borderRadius: 16,
    padding: 15,
    marginBottom: 15,
  },

  option: {
    padding: 12,
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

  optionTextActive: {
    color: '#fff',
    fontWeight: '600',
  },

  button: {
    backgroundColor: Colors.accent,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },

  backButton: {
    marginTop: 10,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.textLight + '40',
  },

  backText: {
    color: Colors.textLight,
    fontWeight: '500',
  },
});
