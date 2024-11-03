import apis from '../../apis/api';
import {
    setLoading,
    setProducts,
    setPagination,
    setProduct,
    setError,
    setFavorites,
    setFavoritesToggle,

} from '../slices/product';
import axios from 'axios';

export const fetchProducts = (page) =>  async (dispatch) => {
    dispatch(setLoading());
    try {
        const {data} = await axios.get(`${apis[0]}/${page}/${10}`);
        const { products, pagination } = data;
        dispatch(setProducts(products));        
        dispatch(setPagination(pagination));
    } catch (error) {
        dispatch(setError(error.message));
    }
}

export const fetchProduct = (id) =>  async (dispatch) => {
    dispatch(setLoading());
    try {
        const {data}=await axios.get(`${apis[0]}/${id}`);
        dispatch(setProduct(data));    
    } catch (error) {
        dispatch(setError(error.message));
    }
}

export const addToFavorites = (id) => async (dispatch, getState) => {
    const {
      product: { favorites },
    } = getState();
  
    const newfavorites = [...favorites, id];
    localStorage.setItem("favorites", JSON.stringify(newfavorites));
    dispatch(setFavorites(newfavorites));
  };
  
  export const removeFromFavorites = (id) => async (dispatch, getState) => {
    const {
      product: { favorites },
    } = getState();
  
    const newfavorites = favorites.filter((favouriteId) => favouriteId !== id);
    localStorage.setItem("favorites", JSON.stringify(newfavorites));
    dispatch(setFavorites(newfavorites));
  };
  
  export const toggleFavorites = (toggle) => async (dispatch, getState) => {
    const {
      product: { favorites, products },
    } = getState();
  
    if (toggle) {
      const filteredProducts = products.filter((product) => favorites.includes(product._id));
      dispatch(setFavoritesToggle(toggle));
      dispatch(setProducts(filteredProducts));
    } else {
      dispatch(setFavoritesToggle(false));
      dispatch(fetchProducts(1));
    }
  };
  