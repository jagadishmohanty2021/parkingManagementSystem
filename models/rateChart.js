const mongoose=require("mongoose")

const rateChart=new mongoose.Schema({
    vehicleType:{
      type:String,
      enum : ["twoWheeler","hatchbackCar","suvCar"],
    },
    price:Number

})

const RateChart=mongoose.model('ratechart',rateChart)
module.exports=RateChart