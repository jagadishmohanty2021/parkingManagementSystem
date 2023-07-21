const express= require("express")
const app=express()
const globalError=require("./utils/globalError")
const router=require("./router/router")
const CustomError=require("./utils/customError")

app.use(express.json())

app.use(express.urlencoded({extended:false}))

/**
 * redirect to router as per specific url path
 */
app.use("/api/v1/",router)

/**
 * If any url path is not present then it will show page not found
 */
app.all('*',(req,res,next)=>{
    let error=new CustomError(`page not found on ${req.originalUrl}`,404)
    next(error)
})


/**
 * If any error are coming outside of the express app then it will handle by GlobalError middleware
 */
app.use(globalError)

module.exports=app;