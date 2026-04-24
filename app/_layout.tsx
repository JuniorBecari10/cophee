import { Stack } from 'expo-router';
import { CartProvider } from '../context/cart';

export default function Layout() {
  return (
    <CartProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="cart-modal"
          options={{ presentation: 'transparentModal' }}
        />
        <Stack.Screen name="checkout" />
      </Stack>
    </CartProvider>
  );
}
