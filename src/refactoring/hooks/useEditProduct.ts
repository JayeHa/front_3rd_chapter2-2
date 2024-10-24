import { useState } from 'react';
import { Discount, Product } from 'types';

interface Props {
  products: Product[];
  onProductUpdate: (updatedProduct: Product) => void;
}

export const useEditProduct = ({ products, onProductUpdate }: Props) => {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newDiscount, setNewDiscount] = useState<Discount>({
    quantity: 0,
    rate: 0,
  });

  // handleEditProduct 함수 수정
  const handleEditProduct = (product: Product) => {
    setEditingProduct({ ...product });
  };

  // 수정 완료 핸들러 함수 추가
  const handleEditComplete = () => {
    if (editingProduct) {
      onProductUpdate(editingProduct);
      setEditingProduct(null);
    }
  };

  // 새로운 핸들러 함수 추가

  const handleEditingProductChange = (
    productId: string,
    updatedFields: Partial<Pick<Product, 'name' | 'price' | 'stock'>>
  ) => {
    if (editingProduct && editingProduct.id === productId) {
      const updatedProduct = { ...editingProduct, ...updatedFields };
      setEditingProduct(updatedProduct);
    }
  };

  const handleAddDiscount = (productId: string) => {
    const updatedProduct = products.find((p) => p.id === productId);
    if (updatedProduct && editingProduct) {
      const newProduct = {
        ...updatedProduct,
        discounts: [...updatedProduct.discounts, newDiscount],
      };
      onProductUpdate(newProduct);
      setEditingProduct(newProduct);
      setNewDiscount({ quantity: 0, rate: 0 });
    }
  };

  const handleRemoveDiscount = (productId: string, index: number) => {
    const updatedProduct = products.find((p) => p.id === productId);
    if (updatedProduct) {
      const newProduct = {
        ...updatedProduct,
        discounts: updatedProduct.discounts.filter((_, i) => i !== index),
      };
      onProductUpdate(newProduct);
      setEditingProduct(newProduct);
    }
  };

  const handleNewDiscountChange = (updatedFields: Partial<Discount>) => {
    setNewDiscount((prevDiscount) => ({
      ...prevDiscount,
      ...updatedFields,
    }));
  };

  return {
    editingProduct,
    handleEditingProductChange,
    handleEditProduct,
    handleEditComplete,

    newDiscount,
    handleNewDiscountChange,
    handleAddDiscount,
    handleRemoveDiscount,
  };
};
