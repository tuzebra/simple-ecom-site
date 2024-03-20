import { useEffect, useMemo } from 'react';
import './App.scss';
import { useUrl } from './hooks/router';
import Link from './components/link';
// import { type CacheRequestInit } from './utils/fetch';
// import { useCacheFetch, type UseCacheFetchReturnType } from './hooks/fetch';
import { useFetchProducts, type Product } from './apis/product';

const App = () => {
  const [url] = useUrl();

  const {loading, response, executePage} = useFetchProducts();

  // compose the page state from the URL query string
  const page = useMemo(() => {
    // the page should start from 1
    return Math.max(
      1,
      parseInt(url.searchParams.get('page') || '1')
    );
  }, [url]);

  // calculate the total page from the response data
  const totalPage = useMemo(() => {
    if(!response?.data){
      return 0;
    }
    return Math.ceil(response.data.total / response.data.limit);
  }, [response]);

  console.log({loading, response, executePage, page});

  // load product when component was mounted
  useEffect(() => {
    executePage(page);
  }, [page, executePage]);

  return (
    <>
      <div>
        {url.toString()}
        <Link href="/" activeClass='active'>Home</Link>
        <Link href="/about" activeClass='active'>About</Link>
        <Link href="/contact" activeClass='active'>Contact</Link>
        <Link href="/products" activeClass='active'>Products</Link>
      </div>
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

export default App;