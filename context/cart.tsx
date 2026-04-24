import { createContext, useContext, useState } from 'react';

type Item = {
    name: string;
    price: number;
    quantity: number;
};

const CartContext = createContext<any>(null);

export function CartProvider({ children }) {
    const [items, setItems] = useState<Item[]>([]);

    function addItem(newItem: { name: string; price: number }) {
        setItems((prev) => {
            const existing = prev.find((i) => i.name === newItem.name);

            if (existing) {
                return prev.map((i) =>
                    i.name === newItem.name
                        ? { ...i, quantity: i.quantity + 1 }
                        : i
                );
            }

            return [...prev, { ...newItem, quantity: 1 }];
        });
    }

    function increase(name: string) {
        setItems((prev) =>
            prev.map((i) =>
                i.name === name ? { ...i, quantity: i.quantity + 1 } : i
            )
        );
    }

    function decrease(name: string) {
        setItems((prev) =>
            prev
                .map((i) =>
                    i.name === name ? { ...i, quantity: i.quantity - 1 } : i
                )
                .filter((i) => i.quantity > 0)
        );
    }

    function remove(name: string) {
        setItems((prev) => prev.filter((i) => i.name !== name));
    }

    function clear() {
        setItems([]);
    }

    return (
        <CartContext.Provider value={{ items, addItem, increase, decrease, remove, clear }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}
