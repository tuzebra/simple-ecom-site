import { useEffect } from 'react';
import { useProductId } from '@/hooks/compute';
import { useFetchProductDetail } from '@/apis/product';


//////////////////////// "REACT COMPONENT" FUNCTIONS ////////////////////////

const ProductDetails = () => {
  const productId = useProductId();

  const {loading, response, execute} = useFetchProductDetail(productId);

  // load product when component was mounted
  useEffect(
    () => execute({}),
    [execute]
  );

  const product = response?.data || null;

  return (
    <>
      {loading && <span className='loading'>Loading product...</span>}
      {product && (
        <div>
          <h1>{product.id} {product.title}</h1>
          <p>{product.price}</p>
          <p>{product.description}</p>
          <p>{product.discountPercentage}</p>
          <p>{product.rating}</p>
          <p>{product.stock}</p>
          <p>{product.brand}</p>
          <p>{product.category}</p>
          <p>{product.thumbnail}</p>
          <p>{product.images}</p>
        </div>
      )}
    </>
  );
}

export default ProductDetails;