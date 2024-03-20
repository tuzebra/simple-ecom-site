import { ComponentPropsWithoutRef } from 'react';
import { type Product } from '@/apis/product';
import { PATH_PAGE__PRODUCT_DETAIL } from '@/const';
import { formatUrl } from '@/utils/string';
import Link from '@/components/link';

//////////////////////// TYPE DEFINITIONS ////////////////////////

type ProductCardProps = ComponentPropsWithoutRef<'div'> & {
  showThumbnail?: boolean;
  product: Product;
}


//////////////////////// "REACT COMPONENT" FUNCTIONS ////////////////////////

export const ProductCard = ({product, showThumbnail = true, ...rest}: ProductCardProps) => {
  const productDetailLink = formatUrl(PATH_PAGE__PRODUCT_DETAIL, {product_id: product.id});
  const hasDiscount = (product?.discountPercentage || 0) > 0;
  return (
    <div className='product-card' {...rest} data-id={product.id}>
        {showThumbnail && (
          <img src={product.thumbnail} alt={product.title} />
        )}
        <h2>{product.title}</h2>
        <main>{product.description}</main>
        <div className='price'>
          {hasDiscount && (
            <>
              <span className='discount'>{product.price}</span>
              <em>{product.discountPercentage}% off</em>
            </>
          )}
          {!hasDiscount && (
            <span>{product.price}</span>
          )}
        </div>
        <Link href={productDetailLink} className='to-detail-link' />
    </div>
  );
}

export default ProductCard;
