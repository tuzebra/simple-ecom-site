import { useEffect } from 'react';
import { usePage, useQuery, useTotalPage } from '@/hooks/compute';
import { useSearchProducts } from '@/apis/product';
import ListProductCards from '@/page-elements/list-product-cards';


//////////////////////// "REACT COMPONENT" FUNCTIONS ////////////////////////

const ProductSearch = () => {
  const page = usePage();
  const query = useQuery();

  const {loading, response, executeSearchPage} = useSearchProducts();

  const totalPage = useTotalPage(response?.data);

  // load product when component was mounted
  useEffect(() => {
    executeSearchPage(query, page);
  }, [page, query, executeSearchPage]);

  return (
    <>
      {loading && <div>Loading...</div>}
      <ListProductCards products={response?.data?.products || []} totalPage={totalPage} />
    </>
  );
}

export default ProductSearch;