import { CartItem, Coupon } from '../../../types';

export const calculateItemTotal = (item: CartItem) => {
  const { product, quantity } = item;
  const { price } = product;

  const totalBeforeDiscount = price * quantity;
  const discount = getMaxApplicableDiscount(item);

  return totalBeforeDiscount * (1 - discount);
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

export const calculateCartTotal = (
  cart: CartItem[],
  selectedCoupon: Coupon | null
) => {
  return {
    totalBeforeDiscount: 0,
    totalAfterDiscount: 0,
    totalDiscount: 0,
  };
};

export const updateCartItemQuantity = (
  cart: CartItem[],
  productId: string,
  newQuantity: number
): CartItem[] => {
  return [];
};
