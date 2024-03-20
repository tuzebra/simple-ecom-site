import { useEffect } from 'react';
import { usePage, useQuery, useTotalPage } from '@/hooks/compute';
import Link from '@/components/link';
import { useSearchProducts } from '@/apis/product';

import { PATH_PAGE__SEARCH} from '@/const';

//////////////////////// "REACT COMPONENT" FUNCTIONS ////////////////////////

const ProductSearchPage = () => {
  const page = usePage();
  const query = useQuery();

  const {loading, response, executeSearchPage} = useSearchProducts();

  const totalPage = useTotalPage(response?.data);

  console.log({loading, response, executeSearchPage, page, totalPage});

  // load product when component was mounted
  useEffect(() => {
    executeSearchPage(query, page);
  }, [page, query, executeSearchPage]);

  return (
    <>
      <div>
        { /* loop to create the pagination links from 0 to totalPage */ }
        {totalPage > 1 && Array.from({length: totalPage}).map((_, i) => (
          <Link key={i} href={`${PATH_PAGE__SEARCH}?page=${i+1}`} activeClass='active' activeFactors={['page']}>{i+1}</Link>
        ))}
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

export default ProductSearchPage;