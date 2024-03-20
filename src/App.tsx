import ProductListPage    from '@/page-elements/product-list';
import ProductSearchPage  from '@/page-elements/product-search';
import NotFoundPage       from '@/page-elements/notfound';
import MainHeader         from '@/page-elements/header';

import { usePathname    } from '@/hooks/compute';

import {
  PATH_PAGE__HOME,
  PATH_PAGE__ABOUT,
  PATH_PAGE__CONTACT,
  PATH_PAGE__SEARCH,
  PATH_PAGE__CART,
} from './const';

const App = () => {

  const pathname = usePathname();

  const IS_NOT_FOUND = ![PATH_PAGE__HOME, PATH_PAGE__ABOUT, PATH_PAGE__CONTACT, PATH_PAGE__SEARCH, PATH_PAGE__CART].includes(pathname);

  return (
    <>
      <MainHeader />
      {IS_NOT_FOUND && <NotFoundPage />}
      {pathname === PATH_PAGE__HOME   && <ProductListPage />}
      {pathname === PATH_PAGE__SEARCH && <ProductSearchPage />}
    </>
  );
}

export default App;