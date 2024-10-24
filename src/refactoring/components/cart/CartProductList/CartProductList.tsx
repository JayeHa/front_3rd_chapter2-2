import { CartItem, Product } from 'types';
import { CartProductCard } from './CartProductCard';

// 재고 계산 함수
const getRemainingStock = (product: Product, cart: CartItem[]) => {
  const cartItem = cart.find((item) => item.product.id === product.id);
  return product.stock - (cartItem?.quantity || 0);
};

type Props = {
  products: Product[];
  cart: CartItem[];
  handleAddToCart: (product: Product) => void;
};

export const CartProductList = ({ products, cart, handleAddToCart }: Props) => {
  return (
    <div className="space-y-2">
      <h2 className="text-2xl font-semibold mb-4">상품 목록</h2>

      {products.map((product) => (
        <CartProductCard
          key={product.id}
          handleAddToCart={handleAddToCart}
          product={product}
          remainingStock={getRemainingStock(product, cart)}
        />
      ))}
    </div>
  );
};
