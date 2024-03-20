import { useEffect } from 'react';
import { usePage, useTotalPage } from '../hooks/compute';
import Link from '../components/link';
import { useFetchProducts } from '../apis/product';

//////////////////////// "REACT COMPONENT" FUNCTIONS ////////////////////////

const ProductListPage = () => {
  const page = usePage();

  const {loading, response, executePage} = useFetchProducts();

  const totalPage = useTotalPage(response?.data);

  console.log({loading, response, executePage, page});

  // load product when component was mounted
  useEffect(() => {
    executePage(page);
  }, [page, executePage]);

  return (
    <>
      <div>
        { /* loop to create the pagination links from 0 to totalPage */ }
        {Array.from({length: totalPage}).map((_, i) => (
          <Link key={i} href={`/products?page=${i+1}`} activeClass='active' activeFactors={['page']}>{i+1}</Link>
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

export default ProductListPage;