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
    <div className='list-products' {...rest}>
      <div className='container'>
        <Pagination totalPage={totalPage} />
        <ul className='list-products-ul'>
          {products.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
        <Pagination totalPage={totalPage} />
      </div>
    </div>
  );
}

export default ListProductCards;
