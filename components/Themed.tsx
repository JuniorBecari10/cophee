import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';

export function Screen({ children }) {
  return <View style={styles.screen}>{children}</View>;
}

export function Card({ children }) {
  return <View style={styles.card}>{children}</View>;
}

export function Title({ children }) {
  return <Text style={styles.title}>{children}</Text>;
}

export function Body({ children }) {
  return <Text style={styles.body}>{children}</Text>;
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
  },
  card: {
    backgroundColor: Colors.backgroundDark,
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    color: Colors.text,
    marginBottom: 10,
  },
  body: {
    color: Colors.textLight,
  },
});
