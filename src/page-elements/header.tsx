import Link from '@/components/link';
import { useQuery } from '@/hooks/compute';
import '@/css/header.scss';

import {
  PATH_PAGE__HOME,
  PATH_PAGE__ABOUT,
  PATH_PAGE__CONTACT,
  PATH_PAGE__SEARCH,
  PATH_PAGE__CART,
} from '@/const';

//////////////////////// "REACT COMPONENT" FUNCTIONS ////////////////////////

const MainHeader = () => {
  const query = useQuery();
  return (
    <header>
      <div id="logo">HP</div>
      <nav>
        <ul>
          <li><Link href={PATH_PAGE__HOME} activeClass='active'>Products</Link></li>
          <li><Link href={PATH_PAGE__ABOUT} activeClass='active'>About</Link></li>
          <li><Link href={PATH_PAGE__CONTACT} activeClass='active'>Contact</Link></li>
        </ul>
      </nav>
      <div id="search-box">
        <input type="text" placeholder="Search..." defaultValue={query} />
      </div>
    </header>
  );
}

export default MainHeader;