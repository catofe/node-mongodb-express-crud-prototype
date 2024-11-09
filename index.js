import express from "express";
import mongoose from "mongoose";

import databaseConfig from "./mongodb.config.js";
import Product from "./models/product.model.js";
import router from "./routes/product.route.js";

const app = express();
const productRoute = router;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/api/products", productRoute);

app.get("/", (req, res) => {
    res.send("Notified from Node API Server.");
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
