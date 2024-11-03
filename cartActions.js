import axios from 'axios';
import { setError, setLoading, setShippingCosts, cartItemAdd, cartItemRemoval, clearCart } from '../slices/cart';
import apis from '../../apis/api';
import {saleCalc} from "../../functions/func"

export const addCartItem = (id, qty) => async (dispatch) => {
	dispatch(setLoading(true));
	try {
		const { data } = await axios.get(`${apis[0]}/${id}`);
		const {_id, title, brand, price, subtitle, images, stock , category, onSale, discount, stripeId} = data;
		const newPrice = saleCalc(price, onSale, discount)
		const itemToAdd = {
			id: _id,
			name: title,
			subtitle: subtitle,
			image: images[0],
			stock: stock,
			brand: brand,
            category: category,
			stripeId: stripeId,
			qty,
			price: newPrice
		};

		dispatch(cartItemAdd(itemToAdd));
	} catch (error) {
		dispatch(
			setError(error.response && error.response.data.message)
		);
	}
};

export const removeCartItem = (id) => async (dispatch) => {
	dispatch(setLoading(true));
	dispatch(cartItemRemoval(id));
};

export const setShipping = (value) => async (dispatch) => {
	dispatch(setShippingCosts(value));
};

export const resetCart = () => (dispatch) => {
	dispatch(clearCart());
};