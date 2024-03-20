import { useEffect } from 'react';
import PageTitle from '@/components/page-title';
import LoadingBar from '@/components/loading-bar';
import { useFetchCart } from '@/apis/cart';

//////////////////////// "REACT COMPONENT" FUNCTIONS ////////////////////////

const Cart = () => {
  const {loading, response, execute} = useFetchCart();

  // load cart when component was mounted
  useEffect(() => {
    execute({});
  }, [execute]);

  return (
    <>
      {loading && <LoadingBar>Loading your cart...</LoadingBar>}
      <div className='container'>
        <PageTitle title='Cart' />
        <div>
          {response && response.data && response.data.products.map((product, index) => (
            <div key={`${product.id}-${index}`}>
              <img src={product.thumbnail} alt={product.title} />
              <h3>{product.title}</h3>
              <p>{product.price}</p>
              <p>{product.quantity}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Cart;
