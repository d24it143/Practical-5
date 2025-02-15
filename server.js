const express = require("express");

const app = express();
const PORT = 3000;

// Sample product data
const products = [
    { id: 1, name: "Laptop", category: "electronics", price: 50000 },
    { id: 2, name: "Smartphone", category: "electronics", price: 30000 },
    { id: 3, name: "Table", category: "furniture", price: 7000 },
    { id: 4, name: "Sofa", category: "furniture", price: 25000 },
    { id: 5, name: "Headphones", category: "electronics", price: 2000 }
];

// GET /products - Return all products
app.get("/products", (req, res) => {
    if (req.query.category) {
        const filteredProducts = products.filter(p => p.category === req.query.category);
        return res.json(filteredProducts);
    }
    res.json(products);
});

// GET /products/:id - Fetch a specific product by ID
app.get("/products/:id", (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
