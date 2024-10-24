import { useState } from 'react';
import { useEditProduct } from 'refactoring/hooks/useEditProduct';
import { Product } from 'types';
import { NewProduct, NewProductForm } from './NewProductForm/NewProductForm';
import { ProductAccordion } from './ProductAccordion/ProductAccordion';
import { useToggleProductAccordion } from './ProductAccordion/useToggleProductAccordion';

interface Props {
  products: Product[];
  onProductUpdate: (updatedProduct: Product) => void;
  onProductAdd: (newProduct: Product) => void;
}

export const ProductManagement = ({
  products,
  onProductAdd,
  onProductUpdate,
}: Props) => {
  const [showNewProductForm, setShowNewProductForm] = useState(false);

  const { openProductIds, toggleProductAccordion } =
    useToggleProductAccordion();

  const editProduct = useEditProduct({ products, onProductUpdate });

  const handleAddNewProduct = (newProduct: NewProduct) => {
    const productWithId = { ...newProduct, id: Date.now().toString() };
    onProductAdd(productWithId);
    setShowNewProductForm(false);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">상품 관리</h2>
      <button
        onClick={() => setShowNewProductForm(!showNewProductForm)}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600"
      >
        {showNewProductForm ? '취소' : '새 상품 추가'}
      </button>
      {showNewProductForm && (
        <NewProductForm addNewProduct={handleAddNewProduct} />
      )}
      <div className="space-y-2">
        {products.map((product, index) => (
          <ProductAccordion
            product={product}
            index={index}
            isOpen={openProductIds.has(product.id)}
            toggleIsOpen={toggleProductAccordion}
            {...editProduct}
          />
        ))}
      </div>
    </div>
  );
};
