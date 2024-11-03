const calculateSubtotal = (cartState) => {
    let result = 0;
    cartState.map((item) => (result += item.qty * item.price)); 
    return result;
  };

  
const updateLocalStorage = (cart) => {
    localStorage.setItem("cartItems", JSON.stringify(cart));
    localStorage.setItem("subtotal", JSON.stringify(calculateSubtotal(cart)));
};

export { calculateSubtotal, updateLocalStorage }