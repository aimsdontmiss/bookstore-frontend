import React, { useState, createContext, useContext } from 'react' ;
import CartContext from './CartContext';
import { useQuery } from 'react-query';
import { detailOrder } from '../api/orderApi';
import { listProduct } from '../api/productApi';
import { detailOrderItem, updateOrderItem } from '../api/orderItemApi';
import { useMutation } from 'react-query';
import { addOrderItem } from '../api/orderItemApi';
import { useQueryClient } from 'react-query';
import { listOrderItem } from '../api/orderItemApi';
import { deleteOrder } from '../api/orderApi';
import { useNavigate } from 'react-router-dom';








const StoreContext = createContext();

export default StoreContext;

export const StoreProvider = ({children}) => {


  // State for maintaining orderItem

  let {customer} = useContext(CartContext);
  const customer_id = String(customer?.id);


  let [ orderItem, setOrderItem ] = useState([]);
  let [ order, setOrder ] = useState([]);

  
  // // I WOULD LIKE TO USE USEEFFECT TO ALWAYS ENSURE AN ORDER EXISTS FOR THE CUSTOMER
  // useEffect(() => {
  //   // Get the existing cart data from local storage
  //   const storedCart = localStorage.getItem('cart');
  //   try {
  //     const parsedCart = JSON.parse(storedCart);
  //     setItems(parsedCart || []);
  //   } catch (e) {
  //     console.error('Error parsing cart data:', e);
  //   }
  // }, []);




  // // Getting or creating user order
  const { data: existingOrder } = useQuery(
    ['existingOrder', customer_id],
    () => detailOrder({ customer_id: customer_id }),

    {
        enabled: !!customer,

        staleTime: 1000 * 60 * 5, // 5 minutes


        onSuccess: (existingOrder) => {
            setOrder(existingOrder)
            // console.log('Existing order found:', existingOrder);
        },

        onError: (error) => {
            console.error('error creating order:', error);
        }
    }
  );


  
  const order_id = order?.id;

  // Getting a list of all our Order Items
  const { data: orderItemList } = useQuery(
    ['orderItemList', order_id],
    () => listOrderItem({ order_id: order_id }),

    {
        enabled: !!order,

        staleTime: 1000 * 10, // 10 seconds

        //
        onSuccess: (orderItemList) => {
         
            setOrderItem(orderItemList) 
            console.log('Order Item ListQ:', orderItemList);
        }, 
       
        onError: (error) => {
            console.error('error creating order:', error);
        }
    }
  );


  const queryClient = useQueryClient();

  const history = useNavigate()

  let {clearCart} = useContext(CartContext);


  const { mutate: clearCartMutation } = useMutation(
      deleteOrder,
      {
          onSuccess: () => {
              queryClient.invalidateQueries('existingOrder')
              console.log('Order deleted successfully');
          },
          onError: () => {
              console.log('Order failed to delete');
          }
      }
  );

  const handleClearCart = async (e) => {

      e.preventDefault();
      console.log('Clear Cart button clicked');

      // // Check if the product already exists in the cart
      // console.log('Existing Cart Item: ', existingOrder);

      const order_id = order?.id;

      try {
          await clearCartMutation({id: order_id});
          clearCart();
          console.log('Order deleted successfully');
          // queryClient.invalidateQueries('existingOrder');
          history('/');
      } catch (error) {
          console.error('Failed to delete Order', error);
      }
  };




        
  // Getting a list of all our Products
  let [productCat, setProductCat] = useState([]);    

  const {data: list, isError, isLoading} = useQuery(['list'], listProduct, {
    onSuccess: (list) => {
      setProductCat(list)
    }
  });

  

  let contextData = {
      order: order,
      productCat: productCat,
      orderItem: orderItem,
      handleClearCart: handleClearCart

  }


  return (
      
      <StoreContext.Provider value={contextData}>
          {children}
      </StoreContext.Provider>

  )  
}


