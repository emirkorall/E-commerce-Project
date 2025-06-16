import { SET_CART, SET_PAYMENT, SET_ADRESS } from '../reducers/shoppingCartReducer';

export const setCart = (cart) => ({
    type: SET_CART,
    payload: cart
});

export const setPayment = (payment) => ({
    type: SET_PAYMENT,
    payload: payment
});

export const setAdress = (adress) => ({
    type: SET_ADRESS,
    payload: adress 
});

