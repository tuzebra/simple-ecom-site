import { useCallback                  } from 'react';
import Link                             from '@/components/link';
import { useQuery, usePathname        } from '@/hooks/compute';
import { useFetchCategories           } from '@/apis/category';
import { capitalizeWords, formatUrl, encodeURIComponentFix   } from '@/utils/string';
import { goto                         } from '@/utils/url';
import '@/css/header.scss';

import {
  PATH_PAGE__HOME,
  PATH_PAGE__CATEGORY,
  PATH_PAGE__SEARCH,
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

  const onSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(event.nativeEvent.target instanceof HTMLFormElement){
      const input = event.nativeEvent.target.querySelector('input');
      if(input){
        const value = input.value.trim();
        if(value){
          goto(`${PATH_PAGE__SEARCH}?q=${encodeURIComponentFix(value)}`);
        }
      }
    }
  },
  []);

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
        <form onSubmit={onSubmit}>
          <input type="text" placeholder="Search..." defaultValue={query} />
        </form>
      </div>
    </header>
  );
}

export default MainHeader;