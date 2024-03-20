import { useEffect, useMemo } from 'react';
import './App.scss';
import Link from './components/link';
// import { type CacheRequestInit } from './utils/fetch';
// import { useCacheFetch, type UseCacheFetchReturnType } from './hooks/fetch';
import ProductListPage from './pages/product-list';

const App = () => {

  return (
    <>
      <div>
        <Link href="/" activeClass='active'>Home</Link>
        <Link href="/about" activeClass='active'>About</Link>
        <Link href="/contact" activeClass='active'>Contact</Link>
        <Link href="/products" activeClass='active'>Products</Link>
      </div>
      <ProductListPage />
    </>
  );
}

export default App;