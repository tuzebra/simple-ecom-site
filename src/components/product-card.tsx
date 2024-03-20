import { ComponentPropsWithoutRef } from 'react';
import { type Product } from '@/apis/product';


//////////////////////// TYPE DEFINITIONS ////////////////////////

type ProductCardProps = ComponentPropsWithoutRef<'div'> & {
  product: Product;
}


//////////////////////// "REACT COMPONENT" FUNCTIONS ////////////////////////

export const ProductCard = ({product, ...rest}: ProductCardProps) => {
  return (
    <div {...rest} data-id={product.id}>
        <h2>{product.title}</h2>
        <p>{product.price}</p>
        <p>{product.description}</p>
    </div>
  );
}

export default ProductCard;
