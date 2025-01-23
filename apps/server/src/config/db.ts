import mongoose from "mongoose";

const ConnectToDB = async (dbStr : string) => {
    try{
        const con = await mongoose.connect(dbStr, {
            dbName : "fashion_store"
        });

        console.log("CONNECTION SUCCESS TO : ", con.connection.host);
    }catch(err){
        console.log("CONNECTION ERROR : " , (err as Error).message);
    }
}

export default ConnectToDB;