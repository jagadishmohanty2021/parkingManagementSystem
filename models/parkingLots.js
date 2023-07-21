const mongoose = require("mongoose")

const parkingLots = new mongoose.Schema({
    parkingName: {
        type: String,
        unique: true
    },
    twoWheeler: Number,
    hatchbackCar: Number,
    suvCar: Number
})

const ParkingLots = mongoose.model('parkinglots', parkingLots)
module.exports = ParkingLots