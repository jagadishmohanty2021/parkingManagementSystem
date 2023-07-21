const app=require("./app.js")
const mongoose=require("mongoose")
require("dotenv").config({path:"./config.env"})
const logger=require("./utils/logger.js")
const port=process.env.PORT||3000


/**
 * Connecting the mongodb database
 */
mongoose.connect(process.env.MONGOURL).then((conn)=>console.log("mongodb connected...")).catch((err)=>{
logger.error(err)
    console.log(err)
})

app.listen(port,()=>console.log("Server connected...."+port))
