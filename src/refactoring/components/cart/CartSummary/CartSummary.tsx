import { useCart } from 'refactoring/hooks';
import { CartItem, Coupon } from 'types';
import { CartItemCard } from './CartItemCard';
import { CouponSelector } from './CouponSelector';
import { OrderSummary } from './OrderSummary';

// 할인 계산 함수
const getAppliedDiscount = (item: CartItem) => {
  return item.product.discounts.reduce((maxDiscount, discount) => {
    if (item.quantity >= discount.quantity) {
      return Math.max(maxDiscount, discount.rate);
    }
    return maxDiscount;
  }, 0);
};

type Props = Pick<
  ReturnType<typeof useCart>,
  | 'removeFromCart'
  | 'updateQuantity'
  | 'applyCoupon'
  | 'selectedCoupon'
  | 'calculateTotal'
> & {
  cart: CartItem[];
  coupons: Coupon[];
};

export const CartSummary = ({
  cart,
  removeFromCart,
  updateQuantity,

  coupons,
  applyCoupon,
  selectedCoupon,

  calculateTotal,
}: Props) => {
  return (
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
  );
};
