import express from "express";
import ProductController from "../controllers/product/getProduct";
import ProductCreateController from "../controllers/product/createProduct";
import WhistListController from "../controllers/product/Whislist";
import { protect } from "../middleware/protect";
import CartController from "../controllers/product/Cart";

const productRoute = express.Router();

const Products = new ProductController();
const CreateProduct = new ProductCreateController();
const WhistList = new WhistListController();
const Cart = new CartController();

productRoute.route("/product/all").get(Products.getAllProducts);
productRoute.route("/product/men").get(Products.getProductMen);
productRoute.route("/product/women").get(Products.getProductWomen);
productRoute.route("/product/accessories").get(Products.getProductAccessories);
productRoute.route("/product/create").post(CreateProduct.createProduct);
productRoute.route("/product/:productId").get(Products.getProductById);

// Whislist 
productRoute.route("/product/add/whislist/:userId/:productId").put(protect,WhistList.add);
productRoute.route("/product/whislist/:userId").get(protect,WhistList.getAll);
productRoute.route("/product/remove/whislist/:userId/:productId").put(WhistList.remove);

// Whislist 
productRoute.route("/product/add/cart/:userId/:productId").put(protect,Cart.add);
productRoute.route("/product/cart/:userId").get(protect,Cart.getAll);
productRoute.route("/product/remove/cart/:userId/:productId").put(Cart.remove);

export default productRoute;
