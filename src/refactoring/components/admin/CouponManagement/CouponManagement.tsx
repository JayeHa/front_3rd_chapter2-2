import { useState } from 'react';
import { Shared } from 'refactoring/components/shared';
import { Coupon } from 'types';

interface Props {
  coupons: Coupon[];
  onCouponAdd: (newCoupon: Coupon) => void;
}

export const CouponManagement = ({ coupons, onCouponAdd }: Props) => {
  const [newCoupon, setNewCoupon] = useState<Coupon>({
    name: '',
    code: '',
    discountType: 'percentage',
    discountValue: 0,
  });

  const handleAddCoupon = () => {
    onCouponAdd(newCoupon);
    setNewCoupon({
      name: '',
      code: '',
      discountType: 'percentage',
      discountValue: 0,
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">쿠폰 관리</h2>
      <div className="bg-white p-4 rounded shadow">
        <div className="space-y-2 mb-4">
          <Shared.Input
            type="text"
            placeholder="쿠폰 이름"
            value={newCoupon.name}
            onChange={(e) =>
              setNewCoupon({ ...newCoupon, name: e.target.value })
            }
          />

          <Shared.Input
            type="text"
            placeholder="쿠폰 코드"
            value={newCoupon.code}
            onChange={(e) =>
              setNewCoupon({ ...newCoupon, code: e.target.value })
            }
          />

          <div className="flex gap-2">
            <select
              value={newCoupon.discountType}
              onChange={(e) =>
                setNewCoupon({
                  ...newCoupon,
                  discountType: e.target.value as 'amount' | 'percentage',
                })
              }
              className="w-full p-2 border rounded"
            >
              <option value="amount">금액(원)</option>
              <option value="percentage">할인율(%)</option>
            </select>

            <Shared.Input
              type="number"
              placeholder="할인 값"
              value={newCoupon.discountValue}
              onChange={(e) =>
                setNewCoupon({
                  ...newCoupon,
                  discountValue: parseInt(e.target.value),
                })
              }
            />
          </div>
          <Shared.Button
            text="쿠폰 추가"
            onClick={handleAddCoupon}
            colorVariants="green"
            size="l"
            className="w-full"
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">현재 쿠폰 목록</h3>
          <div className="space-y-2">
            {coupons.map((coupon, index) => (
              <div
                key={index}
                data-testid={`coupon-${index + 1}`}
                className="bg-gray-100 p-2 rounded"
              >
                {coupon.name} ({coupon.code}):
                {coupon.discountType === 'amount'
                  ? `${coupon.discountValue}원`
                  : `${coupon.discountValue}%`}{' '}
                할인
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
