import { ComponentPropsWithoutRef } from 'react';
import { type Product } from '@/apis/product';
import { Pagination } from '@/components/pagination';
import { ProductCard } from '@/components/product-card';


//////////////////////// TYPE DEFINITIONS ////////////////////////

type ListProductCardsProps = ComponentPropsWithoutRef<'div'> & {
  products: Product[];
  totalPage: number;
}


//////////////////////// "REACT COMPONENT" FUNCTIONS ////////////////////////

export const ListProductCards = ({products, totalPage = 0, ...rest}: ListProductCardsProps) => {
  return (
    <div {...rest}>
      <div>
        <h1>Products</h1>
        <div>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      <div>
        <Pagination totalPage={totalPage} />
      </div>
    </div>
  );
}

export default ListProductCards;
