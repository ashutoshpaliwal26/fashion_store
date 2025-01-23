import { Request, Response } from "express";
import { ICreateProduct } from "../../types/appTypes";
import Product from "../../models/Product";

class ProductCreateController implements ICreateProduct {
  async createProduct(req: Request, res: Response): Promise<any> {
    const { title, image, description, price, category } = req.body;

    if (!title || !image || !description || !price || !category) {
      return res.status(404).json({
        success: false,
        message: "Fill All the Requied Fields",
      });
    }

    try {
      const findProduct = await Product.findOne({
        title: title,
        price: price,
      });

      if (findProduct) {
        return res.status(404).json({
          success: false,
          message: "Product Already Exists",
        });
      }

      const createProduct = await Product.create({
        title,
        image,
        description,
        price,
        category,
      });

      if (!createProduct) {
        return res.status(400).json({
          success: false,
          message: "Product is Not Created",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Product Created Successfully",
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Internal server Error",
      });
    }
  }
}

export default ProductCreateController;
