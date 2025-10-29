import { create } from "zustand";
import { persist } from "zustand/middleware";

const CartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            cart: [],

            addToCart: (item) => {
                const { cart } = get();
                const existing = cart.find((p) => p.codproducto === item.codproducto);

                if (existing) {
                    set({
                        cart: cart.map((p) =>
                            p.codproducto === item.codproducto
                                ? { ...p, quantity: p.quantity + 1 }
                                : p
                        ),
                    });
                } else {
                    set({ cart: [...cart, { ...item, quantity: 1 }] });
                }
            },

            decreaseQuantity: (codproducto) => {
                const { cart } = get();
                set({
                    cart: cart
                        .map((p) =>
                            p.codproducto === codproducto ? { ...p, quantity: p.quantity - 1 } : p
                        )
                        .filter((p) => p.quantity > 0),
                });
            },

            removeFromCart: (codproducto) => {
                set({
                    cart: get().cart.filter((p) => p.codproducto !== codproducto),
                });
            },

            clearCart: () => set({ cart: [] }),

            total: () => {
                return get().cart.reduce((acc, p) => acc + p.precioventa * p.quantity, 0);
            },
        }),
        {
            name: "cart-storage",
        }
    )
);

export default CartStore;
