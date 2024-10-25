import { useState } from 'react';
import { Shared } from 'refactoring/components/shared';
import { Product } from 'types';

const DEFAULT_NEW_PRODUCT: NewProduct = {
  name: '',
  price: 0,
  stock: 0,
  discounts: [],
};

export type NewProduct = Omit<Product, 'id'>;

interface Props {
  addNewProduct: (newProduct: NewProduct) => void;
}

export const NewProductForm = ({ addNewProduct }: Props) => {
  const [newProduct, setNewProduct] = useState<NewProduct>(DEFAULT_NEW_PRODUCT);

  const handleNewProductChange = (updatedFields: Partial<NewProduct>) => {
    setNewProduct((prevProduct) => ({ ...prevProduct, ...updatedFields }));
  };

  const handleAddNewProduct = () => {
    addNewProduct(newProduct);
    setNewProduct(DEFAULT_NEW_PRODUCT);
  };

  return (
    <form
      className="bg-white p-4 rounded shadow mb-4"
      onSubmit={(e) => {
        e.preventDefault();
        handleAddNewProduct();
      }}
    >
      <h3 className="text-xl font-semibold mb-2">새 상품 추가</h3>
      <Shared.Input
        label="상품명"
        id="productName"
        type="text"
        value={newProduct.name}
        onChange={(e) => handleNewProductChange({ name: e.target.value })}
        className="mb-2"
      />

      <Shared.Input
        label="가격"
        id="productPrice"
        type="number"
        value={newProduct.price}
        onChange={(e) =>
          handleNewProductChange({ price: parseInt(e.target.value) })
        }
        className="mb-2"
      />

      <Shared.Input
        label="재고"
        id="productStock"
        type="number"
        value={newProduct.stock}
        onChange={(e) =>
          handleNewProductChange({ stock: parseInt(e.target.value) })
        }
        className="mb-2"
      />

      <Shared.Button text="추가" type="submit" className="w-full" size="l" />
    </form>
  );
};
