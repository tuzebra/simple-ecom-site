import { useEffect } from 'react';
import './App.scss';
import { useUrl } from './hooks/router';
import Link from './components/link';

import { cacheFetch } from './utils/fetch';

const App = () => {
  const [url] = useUrl();

  useEffect(() => {
    async function fetchData() {
      const fetching1 = cacheFetch('https://dummyjson.com/products', {
        queryOptions: {
          limit: '10',
          skip: '10',
          select: 'title,price',
          delay: '1000',
        }
      });

      const fetching2 = cacheFetch('https://dummyjson.com/products', {
        queryOptions: {
          limit: '10',
          skip: '10',
          select: 'title,price',
          delay: '1000',
        }
      });

      const fetching3 = cacheFetch('https://dummyjson.com/products', {
        queryOptions: {
          limit: '10',
          skip: '10',
          select: 'title,price',
          delay: '1000',
        }
      });

      const [r1, r2, r3] = await Promise.all([fetching1, fetching2, fetching3]);
      console.log(r1, r2, r3);

    }
    fetchData();
  }, []);

  return (
    <>
      <div>
        {url.toString()}
        <Link href="/" activeClass='active'>Home</Link>
        <Link href="/about" activeClass='active'>About</Link>
        <Link href="/contact" activeClass='active'>Contact</Link>
        <Link href="/products" activeClass='active'>Products</Link>
      </div>
    </>
  );
}

export default App;