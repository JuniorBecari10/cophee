import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Colors } from '../../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../../context/cart';
import { useRouter } from 'expo-router';

const items = [
  { name: 'Expresso', price: 6 },
  { name: 'Capuccino', price: 10 },
  { name: 'Croissant', price: 9 },
];

export default function Menu() {
  const { addItem } = useCart();
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
        <Text style={styles.title}>Cardápio</Text>

        {items.map((item, i) => (
          <View key={i} style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>{format(item.price)}</Text>

            <TouchableOpacity onPress={() => addItem(item)}>
              <Ionicons name="add-circle-outline" size={24} color={Colors.accent} />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Floating cart button */}
      <TouchableOpacity style={styles.fab} onPress={() => router.push('/cart-modal')}>
        <Ionicons name="cart" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

function format(v: number) {
  return `R$ ${v.toFixed(2).replace('.', ',')}`;
}

const styles = StyleSheet.create({
  container: { backgroundColor: Colors.background },

  title: {
    fontSize: 22,
    color: Colors.text,
    marginBottom: 20,
  },

  card: {
    backgroundColor: Colors.backgroundDark,
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },

  name: { color: Colors.text, fontSize: 16 },
  price: { color: Colors.textLight },

  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: Colors.accent,
    padding: 15,
    borderRadius: 50,
  },
});
