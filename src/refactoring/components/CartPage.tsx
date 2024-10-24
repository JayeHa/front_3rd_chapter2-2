import { CartItem, Coupon, Product } from '../../types.ts';
import { useCart } from '../hooks/index.ts';
import { CartItemCard } from './cart/CartItemCard.tsx';
import { CartProductCard } from './cart/CartProductCard.tsx';
import { CouponSelector } from './cart/CouponSelector.tsx';
import { OrderSummary } from './cart/OrderSummary.tsx';

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

  const getRemainingStock = (product: Product) => {
    const cartItem = cart.find((item) => item.product.id === product.id);
    return product.stock - (cartItem?.quantity || 0);
  };

  const getAppliedDiscount = (item: CartItem) => {
    const { discounts } = item.product;
    const { quantity } = item;
    let appliedDiscount = 0;
    for (const discount of discounts) {
      if (quantity >= discount.quantity) {
        appliedDiscount = Math.max(appliedDiscount, discount.rate);
      }
    }
    return appliedDiscount;
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">장바구니</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">상품 목록</h2>
          {products.map((product) => (
            <CartProductCard
              key={product.id}
              handleAddToCart={addToCart}
              product={product}
              remainingStock={getRemainingStock(product)}
            />
          ))}
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">장바구니 내역</h2>
          <div className="space-y-2">
            {cart.map((item) => (
              <CartItemCard
                key={item.product.id}
                appliedDiscount={getAppliedDiscount(item)}
                item={item}
                removeFromCart={removeFromCart}
                updateQuantity={updateQuantity}
              />
            ))}
          </div>

          <div className="mt-6 bg-white p-4 rounded shadow">
            <h2 className="text-2xl font-semibold mb-2">쿠폰 적용</h2>
            <CouponSelector
              coupons={coupons}
              applyCoupon={applyCoupon}
              selectedCoupon={selectedCoupon}
            />
          </div>

          <div className="mt-6 bg-white p-4 rounded shadow">
            <h2 className="text-2xl font-semibold mb-2">주문 요약</h2>
            <OrderSummary calculateTotal={calculateTotal} />
          </div>
        </div>
      </div>
    </div>
  );
};
