import { useEffect, useMemo } from 'react';
import './App.scss';
import { useUrl } from './hooks/router';
import Link from './components/link';
import { useCacheFetch, type UseCacheFetchReturnType } from './hooks/fetch';
import { type CacheRequestInit } from './utils/fetch';

const App = () => {
  const [url] = useUrl();

  const [loading, response, execute]: UseCacheFetchReturnType<any> = useCacheFetch('https://dummyjson.com/products');

  // load product when component was mounted
  useEffect(() => {
    const requestOptions: CacheRequestInit = {
      queryOptions: {
        limit: '10',
        skip: '10',
        select: 'title,price',
        delay: '500',
      }
    };
    execute(requestOptions);
  }, [execute]);

  return (
    <>
      <div>
        {url.toString()}
        <Link href="/" activeClass='active'>Home</Link>
        <Link href="/about" activeClass='active'>About</Link>
        <Link href="/contact" activeClass='active'>Contact</Link>
        <Link href="/products" activeClass='active'>Products</Link>
      </div>
      {loading && <div>Loading...</div>}
      {response?.success && response?.data && (
        <div>
          <h1>Products</h1>
          <ul>
            {response.data.products.map((product: any) => (
              <li key={product.id}>
                <h2>{product.title}</h2>
                <p>{product.price}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default App;