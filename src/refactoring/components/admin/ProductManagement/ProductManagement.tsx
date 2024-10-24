import { useEditProduct } from 'refactoring/hooks/useEditProduct';
import { Product } from 'types';
import { AddProductPanel } from './AddProductPanel';
import {
  ProductAccordion,
  useToggleProductAccordion,
} from './ProductAccordion';

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
  const { openProductIds, toggleProductAccordion } =
    useToggleProductAccordion();

  const editProduct = useEditProduct({ products, onProductUpdate });

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">상품 관리</h2>
      <AddProductPanel onProductAdd={onProductAdd} />

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
