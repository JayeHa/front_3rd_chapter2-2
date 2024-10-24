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
          <button
            onClick={() => handleRemoveDiscount(productId, index)}
            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
          >
            삭제
          </button>
        )}
      </div>
    ))}
  </>
);
