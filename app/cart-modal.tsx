import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useCart } from '../context/cart';
import { useRouter } from 'expo-router';
import { Colors } from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';

export default function CartModal() {
    const { items, increase, decrease, remove } = useCart();
    const router = useRouter();

    const total = items.reduce((s, i) => s + i.price * i.quantity, 0);

    return (
        <View style={styles.overlay}>
            <View style={styles.modal}>

                <Text style={styles.title}>Seu Pedido</Text>

                {items.length === 0 ? (
                    <View style={styles.empty}>
                        <Ionicons name="cart-outline" size={40} color={Colors.textLight} />
                        <Text style={styles.emptyText}>Seu carrinho está vazio</Text>
                    </View>
                ) : (
                    <>
                        {items.map((item, i) => (
                            <View key={i} style={styles.row}>

                                <View style={{ flex: 1 }}>
                                    <Text style={styles.name}>{item.name}</Text>
                                    <Text style={styles.sub}>
                                        {format(item.price)} × {item.quantity}
                                    </Text>
                                </View>

                                <View style={styles.controls}>
                                    <Pressable onPress={() => decrease(item.name)}>
                                        <Ionicons name="remove-circle-outline" size={22} color={Colors.text} />
                                    </Pressable>

                                    <Text style={styles.qty}>{item.quantity}</Text>

                                    <Pressable onPress={() => increase(item.name)}>
                                        <Ionicons name="add-circle-outline" size={22} color={Colors.text} />
                                    </Pressable>
                                </View>

                                <Pressable onPress={() => remove(item.name)}>
                                    <Ionicons name="trash-outline" size={20} color={Colors.textLight} />
                                </Pressable>

                            </View>
                        ))}

                        <View style={styles.totalRow}>
                            <Text style={styles.total}>Total</Text>
                            <Text style={styles.total}>{format(total)}</Text>
                        </View>

                        <Pressable
                            style={styles.button}
                            onPress={() => router.replace('/checkout')}
                        >
                            <Text style={{ color: '#fff' }}>Ir para pagamento</Text>
                        </Pressable>
                    </>
                )}

                <Pressable onPress={() => router.back()}>
                    <Text style={styles.close}>Fechar</Text>
                </Pressable>

            </View>
        </View>
    );
}

function format(v: number) {
    return `R$ ${v.toFixed(2).replace('.', ',')}`;
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: '#00000088',
        justifyContent: 'flex-end',
    },

    modal: {
        backgroundColor: Colors.background,
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },

    title: {
        fontSize: 18,
        marginBottom: 10,
        color: Colors.text,
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        gap: 10,
    },

    name: {
        color: Colors.text,
        fontWeight: '600',
    },

    sub: {
        color: Colors.textLight,
        fontSize: 12,
    },

    controls: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },

    qty: {
        color: Colors.text,
        width: 20,
        textAlign: 'center',
    },

    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },

    total: {
        fontWeight: 'bold',
        color: Colors.text,
    },

    button: {
        backgroundColor: Colors.accent,
        padding: 12,
        borderRadius: 10,
        marginTop: 10,
        alignItems: 'center',
    },

    close: {
        textAlign: 'center',
        marginTop: 10,
        color: Colors.textLight,
    },

    empty: {
        alignItems: 'center',
        paddingVertical: 30,
    },

    emptyText: {
        color: Colors.textLight,
        marginTop: 10,
    },
});
