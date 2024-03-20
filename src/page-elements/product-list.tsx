import { useEffect } from 'react';
import { usePage, useTotalPage, useCategoryId } from '@/hooks/compute';
import Pagination from '@/components/pagination';
import { useFetchProducts } from '@/apis/product';


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

export default ProductList;