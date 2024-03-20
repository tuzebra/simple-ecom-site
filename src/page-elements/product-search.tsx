import { useEffect } from 'react';
import { usePage, useQuery, useTotalPage } from '@/hooks/compute';
import Pagination from '@/components/pagination';
import { useSearchProducts } from '@/apis/product';


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
      <div>
        <Pagination totalPage={totalPage} />
      </div>
      {loading && <div>Loading...</div>}
      {response?.data && (
        <div>
          <h1>Products</h1>
          <ul>
            {response.data.products.map((product) => (
              <li key={product.id}>
                <h2>{product.title}</h2>
                <p>{product.price}</p>
                <p>{product.description}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default ProductSearch;