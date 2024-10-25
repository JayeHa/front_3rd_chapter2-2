import { Coupon } from 'types';

// 쿠폰 할인 포맷
export const formatCouponDiscount = (coupon: Coupon) => {
  return coupon.discountType === 'amount'
    ? `${coupon.discountValue}원`
    : `${coupon.discountValue}%`;
};
