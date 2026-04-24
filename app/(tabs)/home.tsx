import { View, Text, StyleSheet, ScrollView, Image, Pressable } from 'react-native';
import { Colors } from '../../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../../context/cart';
import { useRouter } from 'expo-router';

const bebidas = [
  {
    name: 'Expresso',
    price: 6,
    desc: 'Café curto e intenso, com crema dourada.',
    img: require('../../assets/expresso.jpeg'),
  },
  {
    name: 'Capuccino',
    price: 10,
    desc: 'Café com leite vaporizado e espuma cremosa.',
    img: require('../../assets/capuccino.jpeg'),
  },
  {
    name: 'Água',
    price: 4,
    desc: 'Água mineral gelada.',
    img: require('../../assets/agua.jpeg'),
  },
  {
    name: 'Chá Gelado',
    price: 7,
    desc: 'Refrescante com toque cítrico.',
    img: require('../../assets/cha.jpeg'),
  },
  {
    name: 'Pingado',
    price: 6.5,
    desc: 'Café com um toque de leite.',
    img: require('../../assets/pingado.jpeg'),
  },
];

const lanches = [
  {
    name: 'Croissant',
    price: 9,
    desc: 'Massa folhada, leve e amanteigada.',
    img: require('../../assets/croissant.jpeg'),
  },
  {
    name: 'Pão de Queijo',
    price: 7,
    desc: 'Clássico mineiro.',
    img: require('../../assets/pao-de-queijo.jpeg'),
  },
  {
    name: 'Misto Quente',
    price: 11,
    desc: 'Queijo e presunto no pão tostado.',
    img: require('../../assets/misto.jpeg'),
  },
  {
    name: 'Donut',
    price: 8,
    desc: 'Macio e doce.',
    img: require('../../assets/donut.jpeg'),
  },
  {
    name: 'Sonho',
    price: 8.5,
    desc: 'Recheado com creme.',
    img: require('../../assets/sonho.jpeg'),
  },
];

export default function Home() {
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      
      <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
        
        {/* HEADER */}
        <Text style={styles.header}>Cardápio</Text>

        <Section title="Bebidas" data={bebidas} />
        <Section title="Lanches" data={lanches} />

      </ScrollView>

      {/* FLOATING CART BUTTON */}
      <Pressable style={styles.fab} onPress={() => router.push('/cart-modal')}>
        <Ionicons name="cart" size={24} color="#fff" />
      </Pressable>

    </View>
  );
}

function Section({ title, data }) {
  return (
    <View style={{ marginBottom: 25 }}>
      <Text style={styles.sectionTitle}>{title}</Text>

      <View style={styles.card}>
        {data.map((item, i) => (
          <MenuItem key={i} item={item} />
        ))}
      </View>
    </View>
  );
}

function MenuItem({ item }) {
  const { addItem } = useCart();

  return (
    <Pressable
      onPress={() => addItem(item)}
      style={({ pressed }) => [
        styles.item,
        pressed && { opacity: 0.6 },
      ]}
    >
      <View style={styles.left}>
        <Image source={item.img} style={styles.image} />

        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.desc}>{item.desc}</Text>
          <Text style={styles.price}>{format(item.price)}</Text>
        </View>
      </View>
    </Pressable>
  );
}

function format(v: number) {
  return `R$ ${v.toFixed(2).replace('.', ',')}`;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  header: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 20,
    paddingTop: 10,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 10,
  },

  card: {
    backgroundColor: Colors.backgroundDark,
    borderRadius: 16,
    padding: 10,
  },

  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.textLight + '30',
  },

  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },

  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  name: {
    color: Colors.text,
    fontWeight: '600',
  },

  desc: {
    color: Colors.textLight,
    fontSize: 12,
  },

  price: {
    color: Colors.text,
    marginTop: 2,
    fontWeight: '600',
  },

  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: Colors.accent,
    padding: 16,
    borderRadius: 50,
    elevation: 4,
  },
});
