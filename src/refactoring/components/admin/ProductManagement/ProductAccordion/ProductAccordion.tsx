import { Shared } from 'refactoring/components/shared';
import { useEditProduct } from 'refactoring/hooks/useEditProduct';
import { Product } from 'types';

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
  handleAddDiscount,
  handleEditComplete,
  handleEditProduct,
  handleEditingProductChange,
  handleRemoveDiscount,
  newDiscount,
  handleNewDiscountChange,
}: Props) => {
  const showProductForm = editingProduct && editingProduct.id === product.id;

  return (
    <div
      data-testid={`product-${index + 1}`}
      className="bg-white p-4 rounded shadow"
    >
      <button
        data-testid="toggle-button"
        onClick={() => toggleIsOpen(product.id)}
        className="w-full text-left font-semibold"
      >
        {product.name} - {product.price}원 (재고: {product.stock})
      </button>
      {isOpen && (
        <div className="mt-2">
          {!showProductForm && (
            <div>
              {product.discounts.map((discount, index) => (
                <div key={index} className="mb-2">
                  <span>
                    {discount.quantity}개 이상 구매 시 {discount.rate * 100}%
                    할인
                  </span>
                </div>
              ))}
              <button
                data-testid="modify-button"
                onClick={() => handleEditProduct(product)}
                className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 mt-2"
              >
                수정
              </button>
            </div>
          )}

          {showProductForm && (
            <div>
              <Shared.Input
                label="상품평: "
                type="text"
                value={editingProduct.name}
                onChange={(e) =>
                  handleEditingProductChange(product.id, {
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
                  handleEditingProductChange(product.id, {
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
                  handleEditingProductChange(product.id, {
                    stock: parseInt(e.target.value),
                  })
                }
                className="mb-4"
                labelSize="l"
              />

              {/* 할인 정보 수정 부분 */}
              <div>
                <h4 className="text-lg font-semibold mb-2">할인 정보</h4>
                {editingProduct.discounts.map((discount, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center mb-2"
                  >
                    <span>
                      {discount.quantity}개 이상 구매 시 {discount.rate * 100}%
                      할인
                    </span>
                    <button
                      onClick={() => handleRemoveDiscount(product.id, index)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      삭제
                    </button>
                  </div>
                ))}
                <div className="flex space-x-2">
                  <Shared.Input
                    type="number"
                    placeholder="수량"
                    value={newDiscount.quantity}
                    onChange={(e) =>
                      handleNewDiscountChange({
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
                      handleNewDiscountChange({
                        rate: parseInt(e.target.value) / 100,
                      })
                    }
                    className="w-1/3"
                  />

                  <button
                    onClick={() => handleAddDiscount(product.id)}
                    className="w-1/3 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                  >
                    할인 추가
                  </button>
                </div>
              </div>
              <button
                onClick={handleEditComplete}
                className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 mt-2"
              >
                수정 완료
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
