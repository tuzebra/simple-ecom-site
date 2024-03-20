import './App.scss'
import { useUrl } from './hooks/router'
import Link from './components/link'

const App = () => {
  const [url] = useUrl()
  console.log('rerender app', url)
  return (
    <>
      <div>
        {url}
        <p><Link href="/home" activeClass='active'>Home</Link></p>
        <p><Link href="/about" activeClass='active'>About</Link></p>
        <p><Link href="/contact" activeClass='active'>Contact</Link></p>
        <p><Link href="/products" activeClass='active'>Products</Link></p>
      </div>
    </>
  )
}

export default App
