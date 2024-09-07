import Product from "../models/marketplace.model";

export const sell = async (req, res) => {
    try{
        const
        {
            product_name,
            image_url,
            seller,
            seller_type,
            price
        } = req.body;

        const newProduct = new Product({
            product_name,
            image_url,
            seller,
            seller_type,
            price
        })

        if (newProduct) {
            console.log(newProduct);
            const savedProduct = await newProduct.save();
            res.status(201).json(savedProduct);
        } else {
            res.status(400).json({ error: "Invalid product data" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const getAllItems = async(req, res) => {
    try{
        const products = await Product.find();
        return products;  
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
export const getItemById = async(req, res) => {
    try{
        const products = await Product.findById({_id});
        return products;
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const buy = async(id) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (deletedProduct.deletedCount === 1)
            console.log("Item purchased successfully");
        else
            console.log("Product could not be found");                
    } catch (err) {
        console.log(err.message);
    }
}