import mongoose from "mongoose";
require('dotenv').config()

const urlDB:string = process.env.DB_URL || ""

const contectedDB = async ()=> {
    try{
await mongoose.connect(urlDB).then((data:any)=> {
    console.log(`contect datebase this ${data.connection.host} url`)
})
    }catch(err){
        console.log(err)
        setTimeout(contectedDB, 500)
    }
}


export default contectedDB