import './App.scss';
import { useUrl } from './hooks/router';
import Link from './components/link';

const App = () => {
  const [url] = useUrl();
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