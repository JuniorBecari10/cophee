import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Colors } from '../../constants/colors';
import { Ionicons } from '@expo/vector-icons';

export default function Profile() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={36} color={Colors.text} />
        </View>

        <Text style={styles.name}>Antonio Carlos</Text>
        <Text style={styles.email}>antonio@email.com</Text>
      </View>

      {/* Info Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Informações</Text>

        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <Ionicons name="person-outline" size={18} color={Colors.textLight} />
            <Text style={styles.label}>Nome</Text>
          </View>
          <Text style={styles.value}>Antonio Carlos</Text>
        </View>

        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <Ionicons name="mail-outline" size={18} color={Colors.textLight} />
            <Text style={styles.label}>Email</Text>
          </View>
          <Text style={styles.value}>antonio@email.com</Text>
        </View>

        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <Ionicons name="location-outline" size={18} color={Colors.textLight} />
            <Text style={styles.label}>Endereço</Text>
          </View>
          <Text style={styles.value}>Rua das Flores, 123</Text>
        </View>
      </View>

      {/* Orders Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Pedidos recentes</Text>

        <View style={styles.order}>
          <View style={styles.rowLeft}>
            <Ionicons name="receipt-outline" size={18} color={Colors.textLight} />
            <View>
              <Text style={styles.orderTitle}>Pedido #123</Text>
              <Text style={styles.orderSubtitle}>Café + Croissant</Text>
            </View>
          </View>

          <View style={styles.statusRow}>
            <Ionicons name="checkmark-circle" size={18} color={Colors.text} />
            <Text style={styles.orderStatus}>Entregue</Text>
          </View>
        </View>

        <View style={styles.order}>
          <View style={styles.rowLeft}>
            <Ionicons name="receipt-outline" size={18} color={Colors.textLight} />
            <View>
              <Text style={styles.orderTitle}>Pedido #122</Text>
              <Text style={styles.orderSubtitle}>Cappuccino</Text>
            </View>
          </View>

          <View style={styles.statusRow}>
            <Ionicons name="time-outline" size={18} color={Colors.accent} />
            <Text style={styles.orderStatusPending}>Em preparo</Text>
          </View>
        </View>

      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  header: {
    alignItems: 'center',
    marginBottom: 25,
  },

  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.backgroundDark,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },

  name: {
    fontSize: 22,
    color: Colors.text,
    fontWeight: '600',
  },

  email: {
    color: Colors.textLight,
  },

  card: {
    backgroundColor: Colors.backgroundDark,
    borderRadius: 16,
    padding: 15,
    marginBottom: 15,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 10,
  },

  row: {
    marginBottom: 12,
  },

  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  label: {
    fontSize: 12,
    color: Colors.textLight,
  },

  value: {
    fontSize: 16,
    color: Colors.text,
    marginTop: 2,
  },

  order: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },

  orderTitle: {
    color: Colors.text,
    fontWeight: '600',
  },

  orderSubtitle: {
    color: Colors.textLight,
    fontSize: 12,
  },

  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  orderStatus: {
    color: Colors.text,
    fontSize: 12,
  },

  orderStatusPending: {
    color: Colors.accent,
    fontSize: 12,
  },
});
