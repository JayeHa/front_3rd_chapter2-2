import { Shared } from 'refactoring/components/shared';
import { Product } from 'types';

interface Props {
  product: Product;
  remainingStock: number;
  handleAddToCart: (product: Product) => void;
}

// 최대 할인율 계산
const getMaxDiscount = (discounts: { quantity: number; rate: number }[]) => {
  return discounts.reduce((max, discount) => Math.max(max, discount.rate), 0);
};

export const CartProductCard = ({
  product,
  remainingStock,
  handleAddToCart,
}: Props) => {
  return (
    <div
      data-testid={`product-${product.id}`}
      className="bg-white p-3 rounded shadow"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold">{product.name}</span>
        <span className="text-gray-600">
          {product.price.toLocaleString()}원
        </span>
      </div>

      <div className="text-sm text-gray-500 mb-2">
        <span
          className={`font-medium ${
            remainingStock > 0 ? 'text-green-600' : 'text-red-600'
          }`}
        >
          재고: {remainingStock}개
        </span>

        {product.discounts.length > 0 && (
          <span className="ml-2 font-medium text-blue-600">
            최대 {(getMaxDiscount(product.discounts) * 100).toFixed(0)}% 할인
          </span>
        )}
      </div>

      {product.discounts.length > 0 && (
        <ul className="list-disc list-inside text-sm text-gray-500 mb-2">
          {product.discounts.map((discount, index) => (
            <li key={index}>
              {discount.quantity}개 이상: {(discount.rate * 100).toFixed(0)}%
              할인
            </li>
          ))}
        </ul>
      )}

      <Shared.Button
        text={remainingStock > 0 ? '장바구니에 추가' : '품절'}
        onClick={() => handleAddToCart(product)}
        disabled={remainingStock <= 0}
        className="w-full"
        size="xl"
      />
    </div>
  );
};
