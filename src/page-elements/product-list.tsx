import { useEffect, useMemo } from 'react';
import { usePage, useTotalPage, useCategoryId } from '@/hooks/compute';
import { capitalizeWords } from '@/utils/string';
import { useFetchProducts } from '@/apis/product';
import ListProductCards from '@/page-elements/list-product-cards';
import PageTitle from '@/components/page-title';
import LoadingBar from '@/components/loading-bar';
import '@/css/product.scss';


//////////////////////// "REACT COMPONENT" FUNCTIONS ////////////////////////

const ProductList = () => {
  const page = usePage();
  const categoryId = useCategoryId();

  const {loading, response, executePage} = useFetchProducts({categoryId});

  const totalPage = useTotalPage(response?.data);

  const pageTitle = useMemo(() => {
    if(!categoryId){
      return 'All Products';
    }
    return capitalizeWords(categoryId);
  }, [categoryId]);

  // load product when component was mounted
  useEffect(() => {
    executePage(page);
  }, [page, executePage]);

  return (
    <>
      <div className='container'>
        <PageTitle title={pageTitle} />
      </div>
      {loading && <LoadingBar>Loading products...</LoadingBar>}
      <ListProductCards products={response?.data?.products || []} totalPage={totalPage} />
    </>
  );
}

export default ProductList;