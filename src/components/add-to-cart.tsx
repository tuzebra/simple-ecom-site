import { useEffect, useCallback, ComponentPropsWithoutRef } from 'react';
import { useGlobalState  } from '@/global-state';
import { type Product } from '@/apis/product';
import { type Cart, useAddProductToCart } from '@/apis/cart';
import '@/css/cart-badge.scss';

type AddToCartProps = ComponentPropsWithoutRef<'button'> & {
  product: Product;
}


//////////////////////// "REACT COMPONENT" FUNCTIONS ////////////////////////

const AddToCart = ({product}: AddToCartProps) => {

  const [globalState, setGlobalState] = useGlobalState();
  const {loading, response, execute, wrongAssumption} = useAddProductToCart(product);

  // watch the wrong assumption count to alert the user
  useEffect(() => {
    if(wrongAssumption > 0){
      alert('There is a problem adding the product to the cart. Please try again.');
    }
  }, [wrongAssumption]);

  // watch the response, whenever we got new response, update the global cart state
  useEffect(() => {
    if(response?.data?.products && typeof setGlobalState === 'function'){
      setGlobalState(currentState => ({
        ...currentState,
        cartTotalProducts: response?.data?.products?.length || 0,
      }));
    }
  }, [response, setGlobalState]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const assumptionResponseData = {
      id: 1, // cart id
      products: Array.from({length: (globalState?.cartTotalProducts||0) + 1}), // 3 products in the cart
    };
    const checkAssumptionCorrect = (data: Cart) => {
      return data.products.length === assumptionResponseData.products.length;
    };
    // because we don't really need the assumptionResponseData to be correct,
    // just need to count how many products in the cart
    // so ignore typescript to check "assumptionResponseData" type
    // @ts-expect-error: ignore
    execute({product}, assumptionResponseData, checkAssumptionCorrect);

  }, [execute, globalState?.cartTotalProducts, product]);

  return (
    <>
      { loading && (<button className='add-to-cart' disabled={true}>Adding to cart...</button>)}
      {!loading && (<button className='add-to-cart' onClick={handleClick}>Add to cart</button>)}
    </>
  );
}

export default AddToCart;
