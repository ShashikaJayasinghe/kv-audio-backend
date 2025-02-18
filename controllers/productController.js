import Product from "../models/product.js";

export async function addProduct (req, res) {
    console.log(req.user)
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