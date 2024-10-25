import { useState } from 'react';
import { Shared } from 'refactoring/components/shared';
import { Product } from 'types';
import { NewProduct, NewProductForm } from './NewProductForm';

interface Props {
  onProductAdd: (newProduct: Product) => void;
}

export const AddProductPanel = ({ onProductAdd }: Props) => {
  const [showNewProductForm, setShowNewProductForm] = useState(false);

  const handleAddNewProduct = (newProduct: NewProduct) => {
    const productWithId = { ...newProduct, id: Date.now().toString() };
    onProductAdd(productWithId);
    setShowNewProductForm(false);
  };

  return (
    <>
      <Shared.Button
        text={showNewProductForm ? '취소' : '새 상품 추가'}
        onClick={() => setShowNewProductForm(!showNewProductForm)}
        className="mb-4"
        colorVariants="green"
        size="2xl"
      />

      {showNewProductForm && (
        <NewProductForm addNewProduct={handleAddNewProduct} />
      )}
    </>
  );
};
