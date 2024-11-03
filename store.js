import { configureStore, combineReducers } from '@reduxjs/toolkit';

import product from './slices/product';
import cart from './slices/cart';
import admin from './slices/admin';

const reducer = combineReducers({
    cart,
    product,
    admin
  
});

const store = configureStore({reducer});

export default store;