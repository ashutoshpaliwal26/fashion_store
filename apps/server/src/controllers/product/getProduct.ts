import { Request, Response } from "express";
import { IGetProduct } from "../../types/appTypes";
import Product from "../../models/Product";

class ProductController implements IGetProduct {
  public async getAllProducts(req: Request, res: Response): Promise<any> {
    try {
      const product = await Product.find({}).limit(4);

      return res.status(200).json({
        success: true,
        data: product,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Internal Serve Error",
      });
    }
  }

  public async getProductById(req: Request, res: Response): Promise<any> {
    try {
      const { productId } = req.params;
      if (!productId) {
        return res.status(200).json({
          success: false,
          message: "Product Id is Not Found",
        });
      }
      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Invalid Product Id",
        });
      }

      return res.status(200).json({
        success: true,
        data: product,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Internal Serve Error",
      });
    }
  }
}

export default ProductController;
