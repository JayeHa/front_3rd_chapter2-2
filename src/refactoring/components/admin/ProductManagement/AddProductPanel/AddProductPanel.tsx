import { useState } from 'react';
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
      <button
        onClick={() => setShowNewProductForm(!showNewProductForm)}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600"
      >
        {showNewProductForm ? '취소' : '새 상품 추가'}
      </button>
      {showNewProductForm && (
        <NewProductForm addNewProduct={handleAddNewProduct} />
      )}
    </>
  );
};
