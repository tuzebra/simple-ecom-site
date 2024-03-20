import { useEffect } from 'react';
import { usePage, useTotalPage, useCategoryId } from '@/hooks/compute';
import { useFetchProducts } from '@/apis/product';
import ListProductCards from '@/page-elements/list-product-cards';
import '@/css/product.scss';


//////////////////////// "REACT COMPONENT" FUNCTIONS ////////////////////////

const ProductList = () => {
  const page = usePage();
  const categoryId = useCategoryId();

  const {loading, response, executePage} = useFetchProducts({categoryId});

  const totalPage = useTotalPage(response?.data);

  // load product when component was mounted
  useEffect(() => {
    executePage(page);
  }, [page, executePage]);

  return (
    <>
      {loading && <div>Loading...</div>}
      <ListProductCards products={response?.data?.products || []} totalPage={totalPage} />
    </>
  );
}

export default ProductList;