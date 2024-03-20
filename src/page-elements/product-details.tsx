import { useEffect } from 'react';
import { useProductId } from '@/hooks/compute';
import { useFetchProductDetail } from '@/apis/product';
import LoadingBar from '@/components/loading-bar';
import ProductCard from '@/components/product-card';
import PageTitle from '@/components/page-title';
import '@/css/product-details-page.scss';


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
      {loading && <LoadingBar>Loading product...</LoadingBar>}
      {product && (
        <div className='container'>
          <PageTitle title={product?.title || ''} />
          <div className='product-details-page'>
            <div>
                <div className='product-images-carousel'>
                  {product.images?.map?.((image, index) => (
                    <img key={index} src={image} alt={product.title} />
                  ))}
                </div>
            </div>
            <div>
              <ProductCard product={product} showThumbnail={false} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductDetails;