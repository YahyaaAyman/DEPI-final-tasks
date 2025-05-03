const Product = require('../models/product')

async function index(req, res) {
    try {
        const products = await Product.find({})
        res.status(200).json({
            method: "GET",
            totalResult: products.length,
            url: "http://localhost:5000/api/v1/products",
            data: products
        })
    } catch(err) {
        res.status(500).json({
            message: err.message
        })
    }
}

async function show(req, res) {
    try {
        const product = await Product.findById(req.params.id)
        if (!product) {
            return res.status(404).json({ message: "Product not found" })
        }
        res.status(200).json({
            method: "GET",
            url: `http://localhost:5000/api/v1/products/${req.params.id}`,
            data: product
        })
    } catch(err) {
        res.status(500).json({
            message: err.message
        })
    }
}

async function store(req, res) {
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
        inStock: req.body.inStock !== undefined ? req.body.inStock : true
    })
    
    try {
        const savedProduct = await product.save()
        res.status(201).json({
            method: "POST",
            url: "http://localhost:5000/api/v1/products",
            data: savedProduct
        })
    } catch(err) {
        res.status(400).json({
            message: err.message
        })
    }
}

async function update(req, res) {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" })
        }
        
        res.status(200).json({
            method: "PUT",
            url: `http://localhost:5000/api/v1/products/${req.params.id}`,
            data: updatedProduct
        })
    } catch(err) {
        res.status(500).json({
            message: err.message
        })
    }
}

async function destroy(req, res) {
    try {
        const product = await Product.findById(req.params.id)
        if (!product) {
            return res.status(404).json({ message: "Product not found" })
        }
        
        await Product.deleteOne({ _id: req.params.id })
        res.status(200).json({ 
            message: "Product deleted successfully" 
        })
    } catch(err) {
        res.status(500).json({
            message: err.message
        })
    }
}

module.exports = {
    index,
    show,
    store,
    update,
    destroy
}