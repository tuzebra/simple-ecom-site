import { useEffect, useState } from 'react';
import './App.scss';
import { useUrl } from './hooks/router';
import Link from './components/link';
// import { type CacheRequestInit } from './utils/fetch';
// import { useCacheFetch, type UseCacheFetchReturnType } from './hooks/fetch';
import { useFetchProducts, type Product } from './apis/product';

const App = () => {
  const [url] = useUrl();

  const [page, setPage] = useState(1);

  const {loading, response, executePage} = useFetchProducts();

  console.log({loading, response, executePage});

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
        <a href="#" onClick={() => setPage(v => v+1)}>Page {page}</a>
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