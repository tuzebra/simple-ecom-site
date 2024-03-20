import { useEffect, useMemo, useState } from 'react';
import { usePage, useTotalPage, useCategoryId } from '@/hooks/compute';
import { capitalizeWords } from '@/utils/string';
import { useFetchProducts } from '@/apis/product';
import { useGlobalState, type GlobalContextStateType, type GlobalContextStateUpdate } from '@/state';
import ListProductCards from '@/page-elements/list-product-cards';
import PageTitle from '@/components/page-title';
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

  const [globalState, setGlobalState] = useGlobalState() as [GlobalContextStateType, GlobalContextStateUpdate];
  console.log('globalState', globalState);

  return (
    <>
      <div className='container'>
        <PageTitle title={pageTitle} />
      </div>
      {loading && <div>Loading...</div>}
      <ListProductCards products={response?.data?.products || []} totalPage={totalPage} />
    </>
  );
}

export default ProductList;