import express from "express";
import ProductController from "../controllers/product/getProduct";
import ProductCreateController from "../controllers/product/createProduct";

const productRoute = express.Router();

const Products = new ProductController();
const CreateProduct = new ProductCreateController();

productRoute.route("/product/all").get(Products.getAllProducts);
productRoute.route("/product/create").post(CreateProduct.createProduct);
productRoute.route("/product/:productId").get(Products.getProductById);

export default productRoute;
