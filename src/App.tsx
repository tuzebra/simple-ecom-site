import { useEffect, useMemo } from 'react';
import './App.scss';
import { useUrl } from './hooks/router';
import Link from './components/link';
import { useCacheFetch, type UseCacheFetchReturnType } from './hooks/fetch';
import { type CacheRequestInit } from './utils/fetch';

const App = () => {
  const [url] = useUrl();

  const {loading, response, execute, wrongAssumption}: UseCacheFetchReturnType<any> = useCacheFetch('https://dummyjson.com/products');

  console.log({loading, response, execute});

  // load product when component was mounted
  useEffect(() => {
    const requestOptions: CacheRequestInit = {
      queryOptions: {
        limit: 10,
        skip: 10,
        select: 'title,price',
        delay: 5000,
      }
    };
    const assumptionResponseData = {
      products: [
        {
          "id": 11,
          "title": "perfume Oil",
          "price": 13
        },
        {
          "id": 12,
          "title": "Brown Perfume",
          "price": 40
        },
      ]
    };
    const checkAssumptionCorrect = (data: any) => {
      return data.products.length === assumptionResponseData.products.length;
    };
    execute(requestOptions, assumptionResponseData, checkAssumptionCorrect);
  }, [execute]);

  useEffect(() => {
    if(wrongAssumption){
      console.log('wrong assumption', wrongAssumption);
    }
  }, [wrongAssumption]);

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
      {response?.data && (
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