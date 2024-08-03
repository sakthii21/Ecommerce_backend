const product = require("../models/productModel");
const { v4 : uuidv4 } = require('uuid');


//getall products
const getallproducts = async(req,res)=>{
    try{
        const products = await product.find();
        res.send(products);
    }catch(err){
        //res.status(500).json({message: err.message});
        console.error(err);
    }
};

const createproducts = async(req,res)=>{
    const {id,title,description,category,price,image,rating}= (req.body);
    const newproduct = new product({
        id:uuidv4(),title,description,category,price,image,rating
    });

    try{
        const savedproduct = await newproduct.save();
     res.json(savedproduct);
    } catch(err){
        console.error(err);
        express.use(express.json());
    }
};

//update a product

const updateProduct = async(req,res)=>{
    const id=req.params.id;
    const updatedProduct = req.body;

    try{
        const pro= await product.findOneAndUpdate({id: id},updatedProduct,{new:true});
        if(!pro){
            return res.status(404).json({message: "Product not found"});
        }
        res.json(pro);
    }catch(err){
        console.error(err);
        res.status(500).json({message: err.message});
    }
};
//delete a product
const deleteproduct = async(req,res)=>{
    const id = req.params.id;
    try{
        const del = await product.findOneAndDelete({id:id});
        if(!del){
            res.json({message:"product not found"});
        }
        res.json(del);
    }catch(err){
        console.error(err);
        res.json({message:err.message});
    }
};

module.exports ={getallproducts,createproducts,updateProduct,deleteproduct};
