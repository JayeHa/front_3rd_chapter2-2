import { CartItem, Coupon } from '../../../types';

export const calculateItemTotal = (item: CartItem) => {
  const { price } = item.product;
  const totalBeforeDiscount = price * item.quantity;
  const discountRate = getMaxApplicableDiscount(item);

  return totalBeforeDiscount * (1 - discountRate);
};

export const getMaxApplicableDiscount = (item: CartItem) => {
  return item.product.discounts.reduce(
    (maxDiscount, d) =>
      item.quantity >= d.quantity && d.rate > maxDiscount
        ? d.rate
        : maxDiscount,
    0
  );
};

const applyCouponDiscount = (amount: number, coupon: Coupon) => {
  return coupon.discountType === 'amount'
    ? (amount = Math.max(0, amount - coupon.discountValue))
    : (amount *= 1 - coupon.discountValue / 100);
};

export const calculateCartTotal = (
  cart: CartItem[],
  selectedCoupon: Coupon | null
) => {
  const totalBeforeDiscount = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
  const totalAfterDiscountWithoutCoupon = cart.reduce(
    (total, item) => total + calculateItemTotal(item),
    0
  );

  const totalAfterDiscount = selectedCoupon
    ? applyCouponDiscount(totalAfterDiscountWithoutCoupon, selectedCoupon)
    : totalAfterDiscountWithoutCoupon;

  const totalDiscount = totalBeforeDiscount - totalAfterDiscount;

  return {
    totalBeforeDiscount: Math.round(totalBeforeDiscount),
    totalAfterDiscount: Math.round(totalAfterDiscount),
    totalDiscount: Math.round(totalDiscount),
  };
};

export const updateCartItemQuantity = (
  cart: CartItem[],
  productId: string,
  newQuantity: number
): CartItem[] => {
  return cart
    .map((item) => {
      if (item.product.id === productId) {
        const maxQuantity = item.product.stock;
        const updatedQuantity = Math.max(0, Math.min(newQuantity, maxQuantity));
        return updatedQuantity > 0
          ? { ...item, quantity: updatedQuantity }
          : null;
      }
      return item;
    })
    .filter((item): item is CartItem => item !== null);
};
