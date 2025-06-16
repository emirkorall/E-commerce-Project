const initialState = {
    cart: [],
    payment:{},
    adress:{},
}

export const SET_CART = 'SET_CART';
export const SET_PAYMENT = 'SET_PAYMENT';
export const SET_ADRESS = 'SET_ADRESS';

const shoppingCartReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CART:
            return { ...state, cart: action.payload };
        case SET_PAYMENT:
            return { ...state, payment: action.payload };
        case SET_ADRESS:
            return { ...state, adress: action.payload };
        default:
            return state;
    }
}

export default shoppingCartReducer;