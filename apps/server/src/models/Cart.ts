import mongoose from "mongoose";

interface ICart {
    user : mongoose.Schema.Types.ObjectId,
    product : mongoose.Schema.Types.ObjectId[]
}

const cartSchema = new mongoose.Schema<ICart>({
    user : {
        type : mongoose.Types.ObjectId,
        ref : "User"
    },
    product : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Product"
        }
    ]
});

const Cart = mongoose.model<ICart>("Cart", cartSchema);
export default Cart;