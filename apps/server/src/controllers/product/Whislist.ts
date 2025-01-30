import { Request, Response } from "express";
import { IWhishList } from "../../types/appTypes";
import WhistList from "../../models/Whislist";
import Product from "../../models/Product";

class WhistListController implements IWhishList {
  public async add(req: Request, res: Response): Promise<any> {
    const { userId, productId } = req.params;

    if (!userId || !productId) {
      return res.status(404).json({
        success: false,
        message: "Invalid ID Params",
      });
    }

    try {
      const findWhislist = await WhistList.findOne({user : userId});
      const productFind = await Product.findByIdAndUpdate(productId, {
        whisList : true,
        cart : false
      }, {new : true});
      if(!productFind){
        return res.status(400).json({
            success : false,
            message : "Invalid Product id"
        });
      }
      if(findWhislist){
        const updateArray = await WhistList.findByIdAndUpdate(
            findWhislist._id,
            {
                $addToSet : {
                    product : productId
                }
            },
            {
                upsert : false,
                new : true
            }
        ).populate("product");

        return res.status(200).json({
            success : false,
            message : "Add Successfully",
            data : updateArray
        });
      }

      const addProduct = await WhistList.findOneAndUpdate({
        user : userId
      }, {
        product : productId
      }, {
        new : true,
        upsert : true
      }).populate("product");

      if(!addProduct){
        return res.status(400).json({
            success : false,
            message : "Product Not Added"
        })
      }
      
      return res.status(200).json({
        success : true,
        message : "Product Added Successfully",
        data : addProduct
      });

    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        errMessage: (err as Error).message,
      });
    }
  }
  public async remove(req: Request, res: Response): Promise<any> {
    const { userId, productId } = req.params;

    if (!userId || !productId) {
      return res.status(404).json({
        success: false,
        message: "Invalid ID Params",
      });
    }

    try {
      const findWhislist = await WhistList.findOne({user : userId});
      const productFind = await Product.findByIdAndUpdate(productId, {
        whisList : false
      }, {new : true});
      if(!productFind){
        return res.status(400).json({
            success : false,
            message : "Invalid Product id"
        });
      }
      if(findWhislist){
        const updateArray = await WhistList.findByIdAndUpdate(
            findWhislist._id,
            {
                $unset : {
                    product : productId
                }
            },
            {
                upsert : false,
                new : true
            }
        ).populate("product");

        return res.status(200).json({
            success : false,
            message : "Add Successfully",
            data : updateArray
        });
      }

      return res.status(400).json({
        success : false,
        message : "Product Not in Whishlist"
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        errMessage: (err as Error).message,
      });
    }
  }

  async getAll (req:Request, res:Response) :Promise<any> {
    const {userId} = req.params;

    if(!userId){
        return res.status(404).json({
            success : false,
            message : "User ID is Not given"
        })
    }

    try{
        const items = await WhistList.findOneAndUpdate({
            user : userId
        }, {}, {upsert : true, new : true}).populate("product");

        if(!items){
            return res.status(400).json({
                success : false,
                message : "WhisList Empty"
            })
        }

        return res.status(200).json({
            success : true,
            message : "Products found Succed",
            data : items
        })
        
    }catch(err){
        return res.status(500).json({
            success : false,
            message : "Invalid Serve Error"
        });
    }
    
  }
}

export default WhistListController
