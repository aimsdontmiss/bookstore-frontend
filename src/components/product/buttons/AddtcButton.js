import React from 'react'
import { Button } from 'react-bootstrap';
import { useMutation, useQueryClient } from 'react-query';
import { addOrderItem, updateOrderItem  } from '../../../api/orderItemApi';
import { useContext } from 'react';
import StoreContext from '../../../context/StoreContext';
import CartContext from '../../../context/CartContext';




const AddtcButton = ({ product }) => {

    const queryClient = useQueryClient();

   
    const {order, orderItem} = useContext(StoreContext);
    const {addItem} = useContext(CartContext);

    const product_id = product?.id;
    const order_id = order?.id;


    
    /// MAKE A REACT QUERY MUTATION TO ADD ORDER ITEM, THEN COMBINE WITHIN A HANDLER FUNCTION WITH ADDiTEM 
    const { mutate: orderItemCreate  } = useMutation(addOrderItem, {
        onSuccess: ()  => {
            queryClient.invalidateQueries('orderItemList')
            console.log('Order Item added successfully');
        },
        onError: () => {
            console.log('Order Item failed to add');
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
    })



    const handleAddOrderItem = async (e) => {   
        e.preventDefault();
        console.log('Add to cart button clicked');

        // Check if the product already exists in the cart

        /* Logic to find the product in the cart based on product_id */;
        const existingCartItem = orderItem?.find((item) => item.product === product_id);

        console.log('Existing Cart Item: ', existingCartItem);

        if (existingCartItem) {
            // If the product exists, update the quantity using your update mutation
            // Assuming you have a function updateOrderItem in your api/orderItemApi

            const orderItem_id = existingCartItem?.id; 
            const updatedQuantity = existingCartItem.quantity + 1;
            const updatedFields = { quantity: updatedQuantity };

            // Call your update mutation
            try {
                await orderItemUpdate({id: orderItem_id, updatedFields});
                addItem(product.id, product.title, product.price);
                console.log('Order Item updated successfully');
                queryClient.invalidateQueries('orderItemList');
            } catch (error) {
                console.error('Failed to update Order Item', error);
            }
        } else {
            // If the product doesn't exist, add a new order item
           
            const orderItemData = {
                order: order_id,
                product: product_id,
                quantity: 1,
            };

            await orderItemCreate({ orderItem: orderItemData });
            addItem(product.id, product.title, product.price);
    }

    }

  return (
    <>
        <Button onClick={(e) => handleAddOrderItem(e)} 
            variant='primary' style={{ borderRadius: '7px' }}>
                add to cart
        </Button>
    </>
  )
}

export default AddtcButton;