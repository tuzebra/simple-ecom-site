import { useEffect, useMemo } from 'react';
import { usePage, useQuery, useTotalPage } from '@/hooks/compute';
import { useSearchProducts } from '@/apis/product';
import ListProductCards from '@/page-elements/list-product-cards';
import PageTitle from '@/components/page-title';


//////////////////////// "REACT COMPONENT" FUNCTIONS ////////////////////////

const ProductSearch = () => {
  const page = usePage();
  const query = useQuery();

  const {loading, response, executeSearchPage} = useSearchProducts();

  const totalPage = useTotalPage(response?.data);

  const pageTitle = useMemo(() => {
    const totalItem = response?.data?.products?.length || 0;
    if(totalItem === 0){
      return `No “${query}” found :(`
    }
    return `Found ${totalItem < 2 ? 'an item' : totalItem + ' items'} for “${query}”`;

  // because we only want to recompute when response changes, regardless of other dependencies
  // so just ignore eslint warning because of missing "query"
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  // load product when component was mounted
  useEffect(() => {
    executeSearchPage(query, page);
  }, [page, query, executeSearchPage]);

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

export default ProductSearch;