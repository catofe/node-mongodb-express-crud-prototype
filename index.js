import express from "express";
import mongoose from "mongoose";

import databaseConfig from "./mongodb.config.js";
import Product from "./models/product.model.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Notified from Node API Server.");
});

app.get("/api/products", async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get("/api/product/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post("/api/products", async (req, res) => {
    try {
        // res.send("Data received").status(200);
        // console.log(`${req.body}`);

        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.put("/api/product/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

mongoose
    .connect(
        `mongodb+srv://admin:${databaseConfig.password}@backenddb.leszy.mongodb.net/Node-API?retryWrites=true&w=majority&appName=backendDB`
    )
    .then(() => {
        console.log("Connected to MongoDB Cluster.");
        app.listen(3000, () => {
            console.log("Server is running on port 3000.");
        });
    })
    .catch(() => console.log("Connection to MongoDB Cluster failed."));
