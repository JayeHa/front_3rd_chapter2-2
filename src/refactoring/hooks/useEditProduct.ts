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

  // 제품 수정 시작
  const editProductStart = (product: Product) => {
    setEditingProduct(product);
  };

  // 제품 수정 완료
  const editProductComplete = () => {
    if (editingProduct) {
      onProductUpdate(editingProduct);
      setEditingProduct(null);
    }
  };

  // 제품 정보 변경
  const updateEditingProduct = (
    productId: string,
    updatedFields: Partial<Pick<Product, 'name' | 'price' | 'stock'>>
  ) => {
    if (editingProduct?.id === productId) {
      setEditingProduct(
        (prevProduct) => prevProduct && { ...prevProduct, ...updatedFields }
      );
    }
  };

  // 할인 추가
  const addDiscount = (productId: string) => {
    const updatedProduct = products.find((p) => p.id === productId);
    if (updatedProduct) {
      const newProduct = {
        ...updatedProduct,
        discounts: [...updatedProduct.discounts, newDiscount],
      };
      onProductUpdate(newProduct);
      setEditingProduct(newProduct);
      setNewDiscount({ quantity: 0, rate: 0 });
    }
  };

  // 할인 삭제
  const removeDiscount = (productId: string, index: number) => {
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

  // 할인 정보 변경
  const changeNewDiscount = (updatedFields: Partial<Discount>) => {
    setNewDiscount((prevDiscount) => ({ ...prevDiscount, ...updatedFields }));
  };

  return {
    editingProduct,
    updateEditingProduct,
    editProductStart,
    editProductComplete,

    newDiscount,
    changeNewDiscount,
    addDiscount,
    removeDiscount,
  };
};
