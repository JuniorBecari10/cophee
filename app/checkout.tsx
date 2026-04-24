import {
    View,
    Text,
    StyleSheet,
    Pressable,
    TextInput,
    Image,
} from 'react-native';
import { Colors } from '../constants/colors';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { useCart } from '../context/cart';

const qrImage = require("../assets/qr-code.jpg");

export default function Checkout() {
    const router = useRouter();
    const { items } = useCart();

    const total = items.reduce((s, i) => s + i.price * i.quantity, 0);

    const [method, setMethod] = useState<'Pix' | 'Crédito' | 'Débito'>('Pix');
    const [pixTimer, setPixTimer] = useState(5);
    const [pixDone, setPixDone] = useState(false);
    const [qr, setQr] = useState(qrImage);

    useEffect(() => {
        if (method !== 'Pix' || pixDone) return;

        setPixTimer(5);
        setQr(qrImage);

        const interval = setInterval(() => {
            setPixTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    setPixDone(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [method]);

    // prevent switching after Pix is done
    function handleSelect(m: typeof method) {
        if (pixDone && method === 'Pix') return;

        setPixDone(false);
        setMethod(m);
    }

    const canConfirm =
        method === 'Pix' ? pixDone : method === 'Crédito' || method === 'Débito';

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Pagamento</Text>

            <Text style={styles.total}>Total: {format(total)}</Text>

            <View style={styles.card}>
                {['Pix', 'Crédito', 'Débito'].map((m) => (
                    <Pressable
                        key={m}
                        style={[
                            styles.option,
                            method === m && styles.optionActive,
                            pixDone && method === 'Pix' && m !== 'Pix' && { opacity: 0.4 },
                        ]}
                        onPress={() => handleSelect(m as any)}
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

            {method === 'Pix' && (
                <View style={styles.card}>
                    <Text style={styles.label}>
                        {pixDone
                            ? 'Pagamento recebido via Pix.'
                            : `Escaneie o QR code (${pixTimer}s)`}
                    </Text>

                    <Image source={qr} style={styles.qr} />
                </View>
            )}

            {(method === 'Crédito' || method === 'Débito') && (
                <View style={styles.card}>
                    <TextInput
                        placeholder="Número do cartão"
                        placeholderTextColor={Colors.textLight}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Nome no cartão"
                        placeholderTextColor={Colors.textLight}
                        style={styles.input}
                    />
                    <View style={{ flexDirection: 'row', gap: 10 }}>
                        <TextInput
                            placeholder="Validade"
                            placeholderTextColor={Colors.textLight}
                            style={[styles.input, { flex: 1 }]}
                        />
                        <TextInput
                            placeholder="CVV"
                            placeholderTextColor={Colors.textLight}
                            style={[styles.input, { flex: 1 }]}
                        />
                    </View>
                </View>
            )}

            <Pressable
                style={[
                    styles.button,
                    !canConfirm && { opacity: 0.5 },
                ]}
                disabled={!canConfirm}
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

function format(v: number) {
    return `R$ ${v.toFixed(2).replace('.', ',')}`;
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
        marginBottom: 10,
        paddingTop: 10,
    },

    total: {
        color: Colors.text,
        fontWeight: '600',
        marginBottom: 15,
        fontSize: 18,
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

    label: {
        color: Colors.textLight,
        marginBottom: 10,
    },

    qr: {
        width: 180,
        height: 180,
        alignSelf: 'center',
        borderRadius: 10,
    },

    input: {
        borderWidth: 1,
        borderColor: Colors.textLight + '40',
        borderRadius: 10,
        padding: 10,
        color: Colors.text,
        marginBottom: 10,
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
