import { useCallback, ComponentPropsWithoutRef } from 'react';
// import { useGlobalState  } from '@/global-state';
import { type Product } from '@/apis/product';
import { useAddProductToCart } from '@/apis/cart';
import '@/css/cart-badge.scss';

type AddToCartProps = ComponentPropsWithoutRef<'button'> & {
  product: Product;
}


//////////////////////// "REACT COMPONENT" FUNCTIONS ////////////////////////

const AddToCart = ({product}: AddToCartProps) => {
  
  const {loading, response, execute} = useAddProductToCart(product);

  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    execute({});
  }, [execute]);

  console.log('response', response);
  

  return (
    <button className='add-to-cart' onClick={handleClick}>Add to cart</button>
  );
}

export default AddToCart;
