import { createSlice } from '@reduxjs/toolkit';

const initialCart = [];

export const loadCartFromSession = (isLoggedIn) => {
  const storageKey = isLoggedIn ? 'itemsLogged' : 'itemsAny';
  const savedCart = typeof window !== 'undefined' ? sessionStorage.getItem(storageKey) : null;
  return savedCart ? JSON.parse(savedCart) : [];
};

const saveCartToSession = (cartItems, isLoggedIn) => {
  const storageKey = isLoggedIn ? 'itemsLogged' : 'itemsAny';
  sessionStorage.setItem(storageKey, JSON.stringify(cartItems));
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCart,
  reducers: {
    addItemToCart: (state, action) => {
      const { item, isLoggedIn } = action.payload;
      state.push(item);
      // Зберігаємо стан у відповідний ключ sessionStorage
      saveCartToSession(state, isLoggedIn);
    },
    removeItemFromCart: (state, action) => {
        const { id, isLoggedIn } = action.payload;
        const updatedCart = state.filter((item) => item.id !== id);
        saveCartToSession(updatedCart, isLoggedIn); // Оновлюємо sessionStorage
        return updatedCart;
    },  
    setCartFromStorage: (state, action) => {
      return action.payload; // Оновлюємо стейт з sessionStorage
    },
    clearCart: (state, action) => {
      state.length = 0;
      const isLoggedIn = action.payload;
      const storageKey = isLoggedIn ? 'itemsLogged' : 'itemsAny';
      sessionStorage.removeItem(storageKey); // Видаляємо з sessionStorage
    }
  },
});

export const { addItemToCart, setCartFromStorage, clearCart, removeItemFromCart } = cartSlice.actions;
export default cartSlice.reducer;
