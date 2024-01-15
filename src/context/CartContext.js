import React from 'react';
import { createContext, useState, useEffect } from "react";
import { addOrder } from '../api/orderApi';
import { useQueryClient, useMutation } from 'react-query';
import { detailCustomer } from '../api/customerApi'
import { useContext } from 'react';
import AuthContext from './AuthContext';
import { useQuery } from 'react-query';






const CartContext = createContext();

export default CartContext;

export const CartProvider = ({children}) => {


  const queryClient = useQueryClient();

  let [items, setItems] = useState([]);
 

  useEffect(() => {
    // Get the existing cart data from local storage
    const storedCart = localStorage.getItem('cart');
    try {
      const parsedCart = JSON.parse(storedCart);
      setItems(parsedCart || []);
    } catch (e) {
      console.error('Error parsing cart data:', e);
    }
  }, []);



  let addItem = ( id, title, price ) => {
  
    let item = { id, title, qty: 1, price };

    // Check if an item with the same title already exists in the items array
    let existingItem = items.find((item) => item.title === title);
  
    if (existingItem) {
      // If the item already exists, update its quantity
      existingItem.qty += 1;
      setItems([...items]);
    }else{
      // Otherwise, add the new item with a default quantity of 1
      setItems([...items, item]);
    }
        
  };    


  useEffect(() => {
    // Save the cart data to local storage  
    try {
      localStorage.setItem('cart', JSON.stringify(items))
      console.log(items);
    } catch (e) {
      console.error('Error saving cart data:', e);
    } 

  }, [items]);


  let totalQuantity = items.reduce((total, item) => total + item.qty, 0);
  let priceQuantity = (items.reduce((price, item) => price + item.price * item.qty, 0)).toFixed(2);


  let removeItem = (name) => {   
      
      let existingItem = items.find((item) => item.title === name);
    
      if (existingItem.qty > 1) {
        // If the item already exists, update its quantity
        existingItem.qty -= 1;
        setItems([...items]);
      } else {
        // Otherwise, add the new item with a default quantity of 1
        setItems(items.filter(({title}) => title !== name));
      }
  
  };


  const clearCart = () => {
    setItems([]); 
    localStorage.removeItem("cart");
    queryClient.invalidateQueries('orderItemList');
  }; 


  // Getting our initial customer value
  let {user} = useContext(AuthContext);
  const user_id = String(user?.user_id);


  let [ customer, setCustomer ] = useState();

  const { data } = useQuery(
    ['customer', user_id],
    () => detailCustomer({ user_id }),
    {
      enabled: !!user,

      staleTime: 1000 * 60 * 5, // 30 minutes

      onSuccess: (data) => {
      setCustomer(data)
      //  console.log(customer); // Set the customer data when the query is successful
      },
    }
  );


    


  let contextData = {
      items: items,
      addItem: addItem,
      removeItem: removeItem,
      totalQuantity: totalQuantity,
      priceQuantity: priceQuantity,
      clearCart: clearCart,
      customer: customer


  }



  return (
      
      <CartContext.Provider value={contextData}>
          {children}
      </CartContext.Provider>
  
  )

}