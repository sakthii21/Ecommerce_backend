const productRoutes=require('./routes/productRoutes');
const userRoutes=require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const express = require('express')
const cors = require('cors');
//app.use(bodyparser.Json());



const app = express();
app.use(express.json());
const mongoose = require('mongoose')

mongoose.connect(
    "mongodb+srv://sakthi-user:mernpassword123@recipe.o8rvaih.mongodb.net/e-commerce"
).then(()=>{
    console.log("mongodb connected");
});


app.set('view engine', 'ejs');
app.use("/" , productRoutes);
app.use("/api",userRoutes);
app.use("/new",cartRoutes);
app.use("/order",orderRoutes);



app.listen(3000, ()=>{
    console.log("server is running on port 3000");
});