import { CartItem } from "@/models/product";
import { addItemToCart, clearCart as clearCartAction, removeItemFromCart } from "@/store/slices/cartSlices";
import { useDispatch, useSelector } from "react-redux";

const useCart = () => {
  const items = useSelector(({ items }: { items: CartItem[]}) => items);
  const dispatch = useDispatch();

  const productToCartItem = (product: any): CartItem => ({
    ...product,
    productId: product.id,
    quantity: 1, // Default quantity can be set to 1
  });

  const addToCart = (item: CartItem) => {
    const productsInCart = items?.filter(i => i.productId === item.productId) ?? [];
    const productsInCartCount = productsInCart.reduce((curr, i) => curr + i.quantity, 0);
    console.log()
    if (productsInCartCount + item.quantity <= 0) {
      dispatch(removeItemFromCart(item.productId));  
      return;
    }
    dispatch({ type: addItemToCart.type, payload: item });
  };

  const removeFromCart = (itemId: string) => {
    dispatch(removeItemFromCart(itemId));
  };

  const clearCart = () => {
    dispatch(clearCartAction());
  };

  return {
    items,
    addToCart,
    removeFromCart,
    clearCart,
    productToCartItem
  };
}

export default useCart;
