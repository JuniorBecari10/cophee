import { View, Text, Button } from 'react-native';
import { useCart } from '../context/cart';
import { Colors } from '../constants/colors';

export default function Checkout() {
  const { clear } = useCart();

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: Colors.background }}>
      <Text style={{ fontSize: 20, color: Colors.text }}>
        Pagamento
      </Text>

      <Button title="Confirmar pagamento" onPress={clear} />
    </View>
  );
}
