import Product from "../models/product.js";
import { isItAdmin } from "./userController.js";

export async function addProduct (req, res) {

    if (req.user == null) {     //if not have token we can't create product if not user 
        res.status(401).json({
            message : "please login and try again"
        })
        return
    }
    if (req.user.role != "admin") {
        res.status(403).json({
            message : "You are not authorized to perform this action"
        })
        return
    }

    const data = req.body;
    const newProduct = new Product(data);

    try {
        await newProduct.save();
        res.json({message : "Product added successfully"});
    }catch (error) {
        res.status(500).json({error : "product added failed"});
    }

    // newProduct.save().then(()=>{
    //     res.json({message : "Product added successfully"});
    // }).catch((error)=>{
    //     res.status(500).json({error : "product addition failed"})
    // })
}

export async function getProducts (req, res) {

    // let isAdmin = isItAdmin(req)
    try {

        if (isItAdmin(req)) {
            const products = await Product.find();
            res.json(products);
            return;
        }else {
            const products = await Product.find({availability : true});
            res.json(products);
            return;
        }
    }catch (e) {
        res.status(500).json({message : "failed to get products"});
    }
}

export async function updateProduct (req, res) {
    try{
        if (isItAdmin(req)) {
            const key = req.params.key;     //* good practice
            const data = req.body;          //*
            
            await Product.updateOne({key : key}, data);             //stop    
            res.json({message : "Product updated successfully"});

            return;

        }else {
            res.status(500).json({message : "You are not authorized to perform this action"});
        }
    }catch (e) {
        res.status(500).json({message : "failed to update product"});
    }
}

export async function deleteProduct (req, res) {
    try {
        if (isItAdmin(req)) {
            const key = req.params.key;

            await Product.deleteOne({key : key});
            res.json({message : "Product deleted successfully"});
        }else {
            res.status(403).json({message : "You are not authorized to perform this action"});
        }
    }catch (e) {
        res.status(500).json({message : "failed to delete product"});
    }
}