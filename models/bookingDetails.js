const mongoose=require("mongoose")

const bookingDetails=new mongoose.Schema({
    vehicleNumber:{
        type: String,
      },
    ownerName:String,
    mobileNumber:Number,
    vehicleType:{
      type:String,
      enum : ["twoWheeler","hatchbackCar","suvCar"],
    },
    intime:Date,
    outtime:Date,
    price:Number

})

const BookingDetails=mongoose.model('bookingDetails',bookingDetails)
module.exports=BookingDetails