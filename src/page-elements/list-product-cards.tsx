import { ComponentPropsWithoutRef } from 'react';
import { type Product } from '@/apis/product';
import { Pagination } from '@/components/pagination';
import { ProductCard } from '@/components/product-card';
import { urlToRelativeString } from '@/utils/url';
import { useSort } from '@/hooks/compute';
import { useUrl } from '@/hooks/router';
import Link from '@/components/link';


//////////////////////// TYPE DEFINITIONS ////////////////////////

type ListProductCardsProps = ComponentPropsWithoutRef<'div'> & {
  products: Product[];
  totalPage: number;
}

enum ProductSortMethodEnum {
  PRICE_ASC = 'price_asc',
  PRICE_DESC = 'price_desc'
}

//////////////////////// "REACT COMPONENT" FUNCTIONS ////////////////////////

export const ListProductCards = ({products, totalPage = 0, ...rest}: ListProductCardsProps) => {
  const [url] = useUrl();

  // sort before render
  const sort = useSort();

  let sortMethod = null;
  if(sort === ProductSortMethodEnum.PRICE_ASC){
    sortMethod = (a: Product, b: Product) => a.price - b.price;
  }
  else if(sort === ProductSortMethodEnum.PRICE_DESC){
    sortMethod = (a: Product, b: Product) => b.price - a.price;
  }

  if(typeof sortMethod === 'function'){
    products = products.slice().sort(sortMethod);
  }

  return (
    <div className='list-products' {...rest}>
      <div className='container'>
        <div className='sort-options'>
          <Link href={urlToRelativeString(url, {sort: ProductSortMethodEnum.PRICE_ASC})}  activeClass='active' activeFactors={['sort']}>Price lowest first</Link>
          <Link href={urlToRelativeString(url, {sort: ProductSortMethodEnum.PRICE_DESC})} activeClass='active' activeFactors={['sort']}>Price Highest first</Link>
        </div>
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
