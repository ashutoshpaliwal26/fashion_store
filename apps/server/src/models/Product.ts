import mongoose from "mongoose";

interface IProduct {
  title: string;
  image: string;
  description: string;
  price: number;
  rating: number;
  review: number;
  category: "MEN" | "WOMEN" | "ACCESSORIES";
  whisList: boolean;
  cart: boolean;
  qty : number;
}

const ProductScheam = new mongoose.Schema<IProduct>({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    default : "https://res.cloudinary.com/djfi9rtlx/image/upload/v1688242002/cld-sample-5.jpg"
  },
  description: {
    type: String,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
  review: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
    enum: ["MEN", "WOMEN", "ACCESSORIES"],
    default: "ACCESSORIES",
  },
  whisList: {
    type: Boolean,
    default: false,
  },
  cart: {
    type: Boolean,
    default: false,
  },
  qty : {
    type : Number,
    default : 1
  }
});

const Product = mongoose.model<IProduct>("Product", ProductScheam);
export default Product;
