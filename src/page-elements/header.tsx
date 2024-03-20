import Link                           from '@/components/link';
import { useQuery                     } from '@/hooks/compute';
import { useFetchCategories           } from '@/apis/category';
import { capitalizeWords, formatUrl   } from '@/utils/string';
import '@/css/header.scss';

import {
  PATH_PAGE__HOME,
  PATH_PAGE__CATEGORY,
} from '@/const';
import { useEffect } from 'react';

//////////////////////// "REACT COMPONENT" FUNCTIONS ////////////////////////

const MainHeader = () => {
  const query = useQuery();

  const {loading, response, execute} = useFetchCategories();

  useEffect(
    () => execute({}),
    [execute]
  );

  const categories = response?.data || [];

  return (
    <header>
      <div id="logo">HP</div>
      <nav>
        <ul>
          <li><Link href={PATH_PAGE__HOME} activeClass='active'>All</Link></li>
          {loading && <li><span className='loading'>loading categories...</span></li>}
          {categories.map((category) => (
            <li key={category}>
              <Link href={formatUrl(PATH_PAGE__CATEGORY, {category_id: category})} activeClass='active'>{capitalizeWords(category)}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <div id="search-box">
        <input type="text" placeholder="Search..." defaultValue={query} />
      </div>
    </header>
  );
}

export default MainHeader;