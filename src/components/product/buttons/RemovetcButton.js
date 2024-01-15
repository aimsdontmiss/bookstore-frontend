import React from 'react'
import { deleteOrderItem } from '../../../api/orderItemApi';
import { useMutation, useQueryClient } from 'react-query';
import { useContext } from 'react';
import StoreContext from '../../../context/StoreContext';
import CartContext from '../../../context/CartContext';
import { Button } from 'react-bootstrap';
import { updateOrderItem } from '../../../api/orderItemApi';






const RemovetcButton = ({ product }) => {

    const queryClient = useQueryClient();

    const {order, orderItem} = useContext(StoreContext);
    const {removeItem} = useContext(CartContext);

    const product_id = product?.id;

    const order_id = order?.id;

    const { mutate: orderItemDelete  } = useMutation(deleteOrderItem, {
        onSuccess: ()  => {
            queryClient.invalidateQueries('orderItemList')
            console.log('Order Item deleted successfully');
        },          
        onError: () => {
            console.log('Order Item failed to delete');
        }
    });


    const { mutate: orderItemUpdate } = useMutation(updateOrderItem, {
        onSuccess: () => { 
            queryClient.invalidateQueries('orderItemList')
            console.log('Order Item updated successfully');

        },
        onError: () => {
            console.log('Order Item failed to update');
        }
    });


    const handleRemoveOrderItem = async (e) => {
        e.preventDefault();
        console.log('Remove from cart button clicked');
    
        // Check if the product already exists in the cart

        /* Logic to find the product in the cart based on product_id */;
        const existingCartItem = orderItem?.find((item) => item.product === product_id);

        console.log('Existing Cart Item: ', existingCartItem);
        
        const orderItem_id = existingCartItem?.id; 

        if (existingCartItem.quantity > 1) {
            // If the product exists, update the quantity using your update mutation
            // Assuming you have a function updateOrderItem in your api/orderItemApi


            const updatedQuantity = existingCartItem.quantity - 1;
            const updatedFields = { quantity: updatedQuantity };

            // Call your update mutation
            try {
                await orderItemUpdate({id: orderItem_id, updatedFields});
                removeItem(product.title);
                console.log('Order Item removed successfully');
                queryClient.invalidateQueries('orderItemList');
            } catch (error) {
                console.error('Failed to update Order Item', error);
            }
        } else {
            // If the product doesn't exist, add a new order item
            await orderItemDelete({id: orderItem_id});
            removeItem(product.title)
            console.log('Order Item deleted successfully');
            // queryClient.invalidateQueries('orderItemList');
        }
    };

    

  return (
    <>

        <Button  onClick={(e) => handleRemoveOrderItem(e)}
         variant="tertiary" style={{ borderRadius: '7px' }}>
            Remove
        </Button>

    </>
  )
}

export default RemovetcButton