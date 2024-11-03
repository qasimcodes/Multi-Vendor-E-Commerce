import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    loading: false,
    products: [],
    product: null,
    error: null,
    pagination: {},
    favoritesToggled: false,
    reviewed: false,
    favorites: JSON.parse(localStorage.getItem("favorites")) ?? [],
    reviewRemoval: false,
    productUpdate: false,
}

export const productSlice = createSlice({
     name: "products",
     initialState,
     reducers: {
          setLoading: ( state ) => {
            state.loading = true
          },
          setProducts: (state, { payload }) => {
            state.loading = false;
            state.error = null;
            state.products = payload;
            state.reviewRemoval = false;
          },
          setPagination: (state, { payload }) => {
            state.loading = false;
            state.error = null;
            state.pagination = payload;
          },
          setProduct: (state, { payload }) => {
            state.product = payload;
            state.loading = false;
            state.error = null;
            state.reviewed = false;
          },
          setError: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
          },
          setFavorites: (state, { payload }) => {
            state.favorites = payload;
          },
          setFavoritesToggle: (state, { payload }) => {
            state.favoritesToggled = payload;
          },
          productReviewed: (state, { payload }) => {
            state.loading = false;
            state.error = null;
            state.reviewed = payload;
          },
          resetError: (state) => {
            state.error = null;
            state.reviewed = false;
            state.productUpdate = false;
            state.reviewRemoval = false;
          },
          setProductUpdateFlag: (state) => {
            state.productUpdate = true;
            state.loading = false;
          },
          setReviewRemovalFlag: (state) => {
            state.error = null;
            state.reviewRemoval = true;
            state.loading = false;
          },
     },
});

export const {

    setProducts,
    setPagination,
    setLoading,
    setProduct,
    setError,
    productReviewed,
    setFavorites,
    setFavoritesToggle,
    resetError,

    setProductUpdateFlag,
    setReviewRemovalFlag,

}  = productSlice.actions;

export default productSlice.reducer;

export const productSelector = (state) => state.products;