import ProductList         from '@/page-elements/product-list';
import ProductSearch      from '@/page-elements/product-search';
import NotFoundPage       from '@/page-elements/notfound';
import MainHeader         from '@/page-elements/header';

import { usePathname    } from '@/hooks/compute';

import {
  PATH_PAGE__HOME,
  PATH_PAGE__SEARCH,
  PATH_PAGE__CATEGORY,
  PATH_PAGE__PRODUCT_DETAIL,
  PATH_PAGE__CART,
} from './const';
import { matchUrl } from './utils/string';

const App = () => {

  const pathname = usePathname();

  const IS_PRODUCT_LIST  = pathname === PATH_PAGE__HOME || Object.keys(matchUrl(pathname, PATH_PAGE__CATEGORY)).length > 0;

  const IS_NOT_FOUND = !IS_PRODUCT_LIST;

  return (
    <>
      <MainHeader />
      {IS_NOT_FOUND     && <NotFoundPage />}
      {IS_PRODUCT_LIST  && <ProductList />}
      {pathname === PATH_PAGE__SEARCH && <ProductSearch />}
    </>
  );
}

export default App;