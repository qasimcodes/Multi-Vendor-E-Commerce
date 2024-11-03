import Product from "../models/products.js";
import asyncHandler from "express-async-handler";

/* Fetch All Products - GET - /api/v1/products */
const fetchProducts = asyncHandler ( async (req, res) => {

        const page = parseInt(req.params.page);  // page=1
        const perPage = parseInt(req.params.perPage);   // 10
  
        const products = await Product.find({});

        if (page && perPage) {
          const totalPages = Math.ceil(products.length / perPage);
                                        ///  12/10 = 2
          const startIndex = (page - 1) * perPage;
          const endIndex = startIndex + perPage;
          const paginatedProducts = products.slice(startIndex, endIndex);      
          res.json({
            products: paginatedProducts,
            pagination: {
              currentPage: page,
              totalPages,
              perPage,
              startIndex,
              endIndex
            },
          });
        } else {
          res.json({
            products,
            pagination: {},
          });
        }
         
});

/* Fetch Single Productby id - GET - /api/v1/product/:pid */
const fetchProduct = async (req, res) => {
    const id = req.params.id;
    const product = await Product.findById(req.params.id);

    if(product){
        res.json( product );
    }
    else {
        res.status(404).send('Product not found.');
		throw new Error('Product not found');
    }
};

/* Add New Product - POST - /api/v1/product/ (Logged in as Admin) */
const addProduct = asyncHandler (async (req, res) => {

});

/* Update Product by id - PUT - /api/v1/product/ (Admin)  */
const updateProduct = asyncHandler (async (req, res) => {

});

/* Delete Product by id - DELETE - /api/v1/product/ (Admin)  */
const deleteProduct = asyncHandler (async (req, res) => {

});

export  {
    fetchProducts,
    fetchProduct,
    addProduct,
    updateProduct,
    deleteProduct
}