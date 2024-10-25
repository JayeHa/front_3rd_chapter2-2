import { Shared } from 'refactoring/components/shared';
import { Discount } from 'types';

interface BaseDiscountInfoProps {
  discounts: Discount[];
}

interface ReadOnlyDiscountProps extends BaseDiscountInfoProps {
  handleRemoveDiscount?: never;
  productId?: never;
}

interface EditableDiscountProps extends BaseDiscountInfoProps {
  handleRemoveDiscount: (productId: string, index: number) => void;
  productId: string;
}

type DiscountInfoProps = ReadOnlyDiscountProps | EditableDiscountProps;

export const DiscountInfo = ({
  discounts,
  handleRemoveDiscount,
  productId,
}: DiscountInfoProps) => (
  <>
    {discounts.map((discount, index) => (
      <div key={index} className="flex justify-between items-center mb-2">
        <span>
          {discount.quantity}개 이상 구매 시 {discount.rate * 100}% 할인
        </span>

        {handleRemoveDiscount && productId && (
          <Shared.Button
            text="삭제"
            onClick={() => handleRemoveDiscount(productId, index)}
            colorVariants="red"
          />
        )}
      </div>
    ))}
  </>
);
