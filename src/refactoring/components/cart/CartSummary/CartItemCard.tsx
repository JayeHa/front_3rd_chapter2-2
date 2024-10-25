import { Shared } from 'refactoring/components/shared';
import { useCart } from 'refactoring/hooks';
import { CartItem } from 'types';

type Props = Pick<
  ReturnType<typeof useCart>,
  'removeFromCart' | 'updateQuantity'
> & {
  item: CartItem;
  appliedDiscount: number;
};

export const CartItemCard = ({
  item,
  appliedDiscount,
  updateQuantity,
  removeFromCart,
}: Props) => {
  return (
    <div className="flex justify-between items-center bg-white p-3 rounded shadow">
      <div>
        <span className="font-semibold">{item.product.name}</span>
        <br />
        <span className="text-sm text-gray-600">
          {item.product.price}원 x {item.quantity}
          {appliedDiscount > 0 && (
            <span className="text-green-600 ml-1">
              ({(appliedDiscount * 100).toFixed(0)}% 할인 적용)
            </span>
          )}
        </span>
      </div>

      <div>
        <Shared.Button
          text="-"
          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
          className="mr-1"
          colorVariants="gray"
        />

        <Shared.Button
          text="+"
          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
          className="mr-1"
          colorVariants="gray"
        />

        <Shared.Button
          text="삭제"
          onClick={() => removeFromCart(item.product.id)}
          colorVariants="red"
        />
      </div>
    </div>
  );
};
