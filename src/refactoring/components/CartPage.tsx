import { useCart } from 'refactoring/hooks';
import { Coupon, Product } from 'types';
import { CartProductList } from './cart/CartProductList';
import { CartSummary } from './cart/CartSummary';

interface Props {
  products: Product[];
  coupons: Coupon[];
}

export const CartPage = ({ products, coupons }: Props) => {
  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    calculateTotal,
    selectedCoupon,
  } = useCart();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">장바구니</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CartProductList
          cart={cart}
          handleAddToCart={addToCart}
          products={products}
        />

        <CartSummary
          cart={cart}
          removeFromCart={removeFromCart}
          updateQuantity={updateQuantity}
          coupons={coupons}
          applyCoupon={applyCoupon}
          selectedCoupon={selectedCoupon}
          calculateTotal={calculateTotal}
        />
      </div>
    </div>
  );
};
