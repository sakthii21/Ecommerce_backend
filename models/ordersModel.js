const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
   orderId:{
    type:String,
    required: true
   },
    cust_name:{
        type: String,
        required: true
    },
    cust_phone:{
        type: String,
        required: true
    },
    cust_address:{
        type: String,
        required: true
    },
    orderDate:{
        type: Date,
        default: Date.now
    },
    products:[
        {
            productId:{
                type: String,
               
            },
            quantity:{
                type: Number,
               
            },
            price:{
                type: Number,
                
            }
        }
    ],

    totalAmount:{
        type: Number,
       
    },
    orderStatus:{
        type: String,
        default: "inprogress",
    
    },
    userId:{
        type: String,
        required: true,
       
    },
    deliveryDate:{
        type: Date,
        default:() => new Date(Date.now()+ 7*24*60*60*1000) // 7 days 
    }
})

const ordersModel = mongoose.model('ordersModel',orderSchema);

module.exports = ordersModel;