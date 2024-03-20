import { useGlobalState  } from '@/global-state';
import Link                from '@/components/link';
import '@/css/cart-badge.scss';

import { PATH_PAGE__CART } from '@/const';

//////////////////////// "REACT COMPONENT" FUNCTIONS ////////////////////////

const CartBadge = () => {
  const [globalState] = useGlobalState();
  return (
    <div id="cart-badge">
      <Link href={PATH_PAGE__CART} activeClass='active'>
      <span className="cart-icon">🛒</span>
        <span className="badge">{globalState?.cartTotalProducts}</span>
      </Link>
    </div>
  );
}

export default CartBadge;