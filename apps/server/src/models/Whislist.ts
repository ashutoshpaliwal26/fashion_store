import mongoose from "mongoose";

interface IWhishList {
    user : mongoose.Schema.Types.ObjectId,
    product : mongoose.Schema.Types.ObjectId[]
}

const whisListSchema = new mongoose.Schema<IWhishList>({
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

const WhistList = mongoose.model<IWhishList>("WhishList", whisListSchema);
export default WhistList;