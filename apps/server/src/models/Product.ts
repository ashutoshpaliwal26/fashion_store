import mongoose from "mongoose";

interface IProduct {
    title : string,
    image : string,
    description : string,
    price : number,
    rating : number,
    review : number,
    category : "MEN" | "WOMEN" | "ACCESSORIES",
}

const ProductScheam = new mongoose.Schema<IProduct>({
    title : {
        type : String,
        required : true,
    },
    price : {
        type : Number,
        required : true,
    },
    image : {
        type : String,
    },
    description : {
        type : String
    },
    rating : {
        type : Number,
        min : 0,
        max : 5,
        default : 0
    },
    review : {
        type : Number,
        default : 0
    },
    category : {
        type : String,
        enum : ["MEN", "WOMEN", "ACCESSORIES"],
        default : 'ACCESSORIES'
    }
});

const Product = mongoose.model<IProduct>("Product", ProductScheam);
export default Product;