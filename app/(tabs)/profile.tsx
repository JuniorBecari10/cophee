import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import { Colors } from '../../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export default function Profile() {
  const [name, setName] = useState('Antonio Carlos');
  const [email, setEmail] = useState('antonio@email.com');
  const [address, setAddress] = useState('Rua das Flores, 123');

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={36} color={Colors.text} />
        </View>

        <Text style={styles.name}>{name}</Text>
        <Text style={styles.email}>{email}</Text>
      </View>

      {/* Info Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Informações</Text>

        {/* Nome */}
        <InputRow
          icon="person-outline"
          label="Nome"
          value={name}
          onChange={setName}
        />

        {/* Email */}
        <InputRow
          icon="mail-outline"
          label="Email"
          value={email}
          onChange={setEmail}
        />

        {/* Endereço */}
        <InputRow
          icon="location-outline"
          label="Endereço"
          value={address}
          onChange={setAddress}
        />
      </View>

      {/* Orders Card (unchanged) */}
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

function InputRow({ icon, label, value, onChange }) {
  return (
    <View style={styles.row}>
      
      <View style={styles.rowLeft}>
        <Ionicons name={icon} size={18} color={Colors.textLight} />
        <Text style={styles.label}>{label}</Text>
      </View>

      <TextInput
        value={value}
        onChangeText={onChange}
        style={styles.input}
        placeholderTextColor={Colors.textLight}
      />

    </View>
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

  input: {
    marginTop: 4,
    borderWidth: 1,
    borderColor: Colors.textLight + '40',
    borderRadius: 10,
    padding: 10,
    color: Colors.text,
    backgroundColor: Colors.background,
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
