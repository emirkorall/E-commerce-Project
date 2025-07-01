import axiosInstance from '../../utils/axios';
import  * as jwtDecode  from 'jwt-decode';
import { setRoles } from './clientActions';
import { 
  setCategories, 
  setProductList, 
  setTotal, 
  setFetchState,
  setLimit,
  setOffset,
  setFilter 
} from './productActions';
import { featuredProducts } from '../../components/ProductCard';
import { clearCart } from '../slices/cartSlice';

export const fetchRoles = () => async (dispatch, getState) => {
  
  const { roles } = getState().client;
  if (roles && roles.length > 0) {
    return; 
  }

  try {
    const response = await axiosInstance.get('/roles');
    dispatch(setRoles(response.data));
  } catch (error) {
    throw error;
  }
};

// Signup thunk
export const signup = (userData) => async (dispatch) => {
  try {
    const response = await axiosInstance.post('/api/auth/signup', userData);
    return response.data;
  } catch (error) {
    if (error.response) {
    }
    throw error;
  }
};

// Auto login thunk - checks for existing token and sets up user state
export const autoLogin = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) return;

    axiosInstance.defaults.headers.common['Authorization'] = token;

    const decoded = jwtDecode(token); // Decode JWT
    const { id, name, email, role } = decoded;

    dispatch(setUser({ id, name, email }, [], []));
    dispatch(setRoles([{ authority: role }]));

    return { success: true };
  } catch (error) {
    localStorage.removeItem('token');
    delete axiosInstance.defaults.headers.common['Authorization'];
    return null;
  }
};

// Fetch categories thunk
export const fetchCategories = () => async (dispatch) => {
  try {
    const response = await axiosInstance.get('/categories');
    dispatch(setCategories(response.data));
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fetch products thunk
export const fetchProducts = (params = {}) => async (dispatch, getState) => {
  try {
    dispatch(setFetchState('FETCHING'));
    
    let products = [...featuredProducts];
    
    if (params.category && params.category !== 'all') {
      products = products.filter(p => p.category === params.category);
    }
    
    if (params.rating && params.rating !== 'all') {
      products = products.filter(p => p.rating >= Number(params.rating));
    }
    
    if (params.minPrice !== undefined && params.maxPrice !== undefined) {
      products = products.filter(p => 
        p.price >= params.minPrice && p.price <= params.maxPrice
      );
    }

    const limit = params.limit || 9;
    const offset = params.offset || 0;
    const paginatedProducts = products.slice(offset, offset + limit);

    dispatch(setProductList(paginatedProducts));
    dispatch(setTotal(products.length));
    
    if (params.limit) dispatch(setLimit(params.limit));
    if (params.offset) dispatch(setOffset(params.offset));
    if (params.filter) dispatch(setFilter(params.filter));
    
    dispatch(setFetchState('FETCHED'));
    return { products: paginatedProducts, total: products.length };
  } catch (error) {
    dispatch(setFetchState('ERROR'));
    throw error;
  }
};

// Place order thunk
export const placeOrder = (orderData) => async (dispatch) => {
  try {
    const response = await axiosInstance.post('/orders', orderData);
    
    // Clear the cart after successful order placement
    dispatch(clearCart());
    
    return response.data;
  } catch (error) {
    console.error('Error placing order:', error);
    throw error;
  }
};
