const Cart = require('../models/cartModel');
const Product = require('../models/productModel')


const createCart = async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user; // Corrected to req.user

    try {
        // Find the user's cart
        let cart = await Cart.findOne({ userId });

        if (cart) {
            // Find the product index in the cart's products array
            const productIndex = cart.products.findIndex(p => p.productId === productId);

            if (productIndex !== -1) {
                // Product already exists, update the quantity
                cart.products[productIndex].quantity += quantity;
            } else {
                // Product does not exist, add it
                cart.products.push({ productId, quantity });
            }
            // Save the updated cart
            await cart.save();
            res.json(cart);
        } else {
            // Create a new cart if it doesn't exist
            cart = new Cart({
                userId,
                products: [{ productId, quantity }]
            });
            const savedCart = await cart.save();
            res.json(savedCart);
        }
    } catch (err) {
        res.status(401).json({ message: err.message });
    }
};





const getCartProducts = async (req, res) => {
    try {
        const userId = req.user; // Assuming userId is added to req in auth middleware

        // Fetch the cart for the user
        const userCart = await Cart.findOne({  userId });

        if (!userCart) {
            return res.status(404).json({ message: 'No items in cart' });
        }

    const cartproducts = userCart.products;
    let cartProductArray = [];
    let totalAmount =0;
    for ( let i =0; i< cartproducts.length; i++){
        const productIds = cartproducts[i].productId;
        const qty = cartproducts[i].quantity;
   
         const product = await Product.findOne({id: productIds})
         if(product){
            const cartArray = {};
            cartArray.title = product.title;
            cartArray.description = product.description;
            cartArray.image = product.image;
            cartArray.price = product.price;
            cartArray.total = Number(product.price)* Number(qty);
         
            cartProductArray.push(cartArray);
            totalAmount += cartArray.total;
        }
         else{
            console.error("product not found")
         }  
        }

        res.json({cartProductArray,totalAmount});
       
    } catch (error) {
        console.error('Error fetching cart products:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

 

const deleteProduct = async (req, res) => {
    try {
      const userId = req.user; // Assuming userId is obtained from req.user
      const { productId } = req.body; // Extract productId from request body
  
      const cart = await Cart.findOne({ userId });
  
      if (cart) {
        // Filter out the product to be deleted
        const updatedProducts = cart.products.filter(prod => prod.productId.toString() !== productId);
  
        if (updatedProducts.length === 0) {
          // Delete the cart if no products are left
          await Cart.findByIdAndDelete(cart._id);
          return res.status(200).json({ message: "Cart deleted" });
        } else {
          // Update the cart with the remaining products
          cart.products = updatedProducts;
          await cart.save();
          return res.status(200).json({ message: "Product deleted" });
        }
      } else {
        return res.status(404).json({ message: "Cart not found" });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: "Server error" });
    }
  };
  
  module.exports = { createCart, getCartProducts, deleteProduct };
  




