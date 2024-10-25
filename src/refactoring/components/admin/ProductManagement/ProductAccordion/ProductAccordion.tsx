import { Shared } from 'refactoring/components/shared';
import { useEditProduct } from 'refactoring/hooks/useEditProduct';
import { Product } from 'types';
import { DiscountInfo } from './DiscountInfo';

interface Props extends ReturnType<typeof useEditProduct> {
  product: Product;
  index: number;

  isOpen: boolean;
  toggleIsOpen: (productId: string) => void;
}

export const ProductAccordion = ({
  product,
  index,

  isOpen,
  toggleIsOpen,

  editingProduct,
  updateEditingProduct,
  editProductStart,
  editProductComplete,

  newDiscount,
  changeNewDiscount,
  addDiscount,
  removeDiscount,
}: Props) => {
  const showProductForm = editingProduct && editingProduct.id === product.id;

  return (
    <div
      data-testid={`product-${index + 1}`}
      className="bg-white p-4 rounded shadow"
    >
      <Shared.Button
        text={`${product.name} - ${product.price}원 (재고: ${product.stock})`}
        onClick={() => toggleIsOpen(product.id)}
        data-testid="toggle-button"
        className="w-full text-left font-semibold"
        colorVariants="none"
        size="none"
      />
      {isOpen && (
        <div className="mt-2">
          {!showProductForm && (
            <div>
              <DiscountInfo discounts={product.discounts} />

              <Shared.Button
                text="수정"
                data-testid="modify-button"
                onClick={() => editProductStart(product)}
                className="mt-2"
              />
            </div>
          )}

          {showProductForm && (
            <div>
              <Shared.Input
                label="상품평: "
                type="text"
                value={editingProduct.name}
                onChange={(e) =>
                  updateEditingProduct(product.id, {
                    name: e.target.value,
                  })
                }
                className="mb-4"
                labelSize="l"
              />

              <Shared.Input
                label="가격: "
                type="number"
                value={editingProduct.price}
                onChange={(e) =>
                  updateEditingProduct(product.id, {
                    price: parseInt(e.target.value),
                  })
                }
                className="mb-4"
                labelSize="l"
              />

              <Shared.Input
                label="재고: "
                type="number"
                value={editingProduct.stock}
                onChange={(e) =>
                  updateEditingProduct(product.id, {
                    stock: parseInt(e.target.value),
                  })
                }
                className="mb-4"
                labelSize="l"
              />

              {/* 할인 정보 수정 부분 */}
              <div>
                <h4 className="text-lg font-semibold mb-2">할인 정보</h4>
                <DiscountInfo
                  discounts={editingProduct.discounts}
                  handleRemoveDiscount={removeDiscount}
                  productId={product.id}
                />

                <div className="flex space-x-2">
                  <Shared.Input
                    type="number"
                    placeholder="수량"
                    value={newDiscount.quantity}
                    onChange={(e) =>
                      changeNewDiscount({
                        quantity: parseInt(e.target.value),
                      })
                    }
                    className="w-1/3"
                  />
                  <Shared.Input
                    type="number"
                    placeholder="할인율 (%)"
                    value={newDiscount.rate * 100}
                    onChange={(e) =>
                      changeNewDiscount({
                        rate: parseInt(e.target.value) / 100,
                      })
                    }
                    className="w-1/3"
                  />

                  <Shared.Button
                    text="할인 추가"
                    onClick={() => addDiscount(product.id)}
                    className="w-1/3"
                    size="l"
                  />
                </div>
              </div>

              <Shared.Button
                text="수정 완료"
                onClick={editProductComplete}
                className="mt-2"
                colorVariants="green"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
