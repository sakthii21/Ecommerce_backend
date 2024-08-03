const Order = require('../models/ordersModel');
const Cart = require('../models/cartModel');
const Product = require('../models/productModel');
const { v4 : uuidv4 } = require('uuid');
const ordersModel = require('../models/ordersModel');


const orderproduct = async (req, res) => {
    const { cust_name, cust_phone, cust_address } = req.body;
    const userId = req.user; 

    try {
        const cart = await Cart.findOne({ userId: userId });
        console.log("Cart found:", cart);

        if (!cart) {
            return res.status(404).send({ message: "no items in cart" });
        }

        const cartproducts = cart.products;
        let cartproductArray = [];
    

        let totalAmount = 0;

        for(let i = 0; i< cartproducts.length; i++){
            const productId = cartproducts[i].productId;
            const qty = cartproducts[i].quantity;

//fetch product details
const product = await Product.findOne({id: productId});
if(product){

    const cartProduct ={
    title : product.title,
    description : product.description,
    price: product.price,
    quantity :qty,
    image : product.image,
    totalPrize : Number(product.price) * Number(qty)
    }
    cartproductArray.push(cartProduct);
    totalAmount += cartProduct.totalPrize;
    
}else{
    console.warn("Product not found");
}}


        const buy = new Order({
            orderId: uuidv4(),
             cust_name,
            cust_phone,
            cust_address,
            orderDate: Date.now(),
            products: cart.products.map(item=>({
                productid : item.productId,
                pro_qty: item.quantity
            })),
            totalAmount: totalAmount,
            orderStatus: "Inprogress",
            userId,
            deliveryDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000) // 10 days
        });

     await buy.save();


        // Clear the cart after order is placed
        await Cart.deleteOne({ userId:userId});

        res.status(200).json({message: "Order placed successfully",order : buy, cartproducts :cartproductArray });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }}



// my orders 

// const getOrders = async (req, res) => {
//     const userId = req.user;
  
//     try {
//       const orderuser = await ordersModel.findOne({ userId: userId });
  
//       if (!orderuser) {
//         return res.status(404).json({ message: "User has not placed any orders" });
//       }
  
//       const myorder = orderuser.products;
  
      
  
//       let cartArray = [];
  
//       for (let i = 0; i < myorder.length; i++) {
//         const productId = myorder[i].productId;
//         const qty = myorder[i].quantity;
  
//         // Log prodId to check if it is correct
//         console.log(`Fetching product with ID: ${productId}`);
  
//         const orders = await Product.findOne({ id: productId });
  
//         if (orders) {
//           const buynow = {
//             title: orders.title,
//             description: orders.description,
//             price: orders.price,
//             quantity: qty,
//             image: orders.image
//             // totalPrize: Number(orders.price) * Number(qty)
//           };
//           cartArray.push(buynow);
//         } else {
//           console.warn(`Product not found: ${productId}`);
//         }
//       }
  
//       const { totalAmount, orderDate, deliveryDate, orderId, orderStatus } = orderuser;
  
//       res.status(200).json({
//         products: cartArray,
//         totalAmount,
//         orderDate,
//         deliveryDate,
//         orderId,
//         orderStatus
//       });
  
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ message: err.message });
//     }
//   };
  
  const getOrders = async (req, res) => {
    try {
        const userId = req.user;
        const order = await ordersModel.findOne({ userId });

       
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        const { orderId, products, orderDate, deliveryDate, orderStatus, totalAmount } = order;

        res.status(200).json({ orderId, products, orderDate, deliveryDate, orderStatus, totalAmount});

      
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { orderproduct,getOrders };
