const asyncError = require("../utils/asyncError")
const Booking = require("../models/bookingDetails")
const Joi = require("joi")
const logger = require("../utils/logger")
const RateChart = require("../models/rateChart")
const ParkingLots = require("../models/parkingLots")

/*
* Get booking information
* if vehicle number is present then it will show only particular vehicle details
* if vehicle number is not present then it will show all booking details 
*/
const getBooking = asyncError(async (req, res, next) => {
    const schema = Joi.object({
        vehicleNumber: Joi.string().min(4).max(20).required()
    })
    try {
        let vehicleData = {}
        if (req.body) {
            const value = await schema.validateAsync(req.body)
            vehicleData = { vehicleNumber: value.vehicleNumber }
        }
        const getBookingDetails = await Booking.find(vehicleData)
        res.status(200).json({ status: "success", data: { getBookingDetails } })

    } catch (error) {
        logger.error(error.message)
        next(error)
    }
})

/*
CreateBooking api
* it is get the emplty parking lots
* if parking lot is availbale then one record will create in database
* if parking lot is unavailale as per vehicletype then it will show error message
*/

const createBooking = asyncError(async (req, res, next) => {
    const schema = Joi.object({
        vehicleNumber: Joi.string().min(4).max(20).required(),
        ownerName: Joi.string().min(4).max(20).required(),
        vehicleType: Joi.string().valid("twoWheeler", "hatchbackCar", "suvCar").required(),
        mobileNumber: Joi.number().min(10).required(),
    })

    try {
        const value = await schema.validateAsync(req.body)
        let getLot = {}
        getLot[value.vehicleType] = { $gte: 1 }
        const getEmptyLots = await ParkingLots.findOne(getLot)
        if (getEmptyLots) {
            const createUserData = await Booking.create({ ...value, parkingName: getEmptyLots.parkingName, intime: new Date() })
            res.status(201).json({ status: "success", data: { createUserData } })
        } else {
            res.status(404).json({ status: "success", data: { message: "All parking lots are full" } })
        }
    } catch (error) {
        logger.error(error.message)
        next(error)
    }

})

/**
 * UpdateBooking api
 * It is update the booking details as per vehicle number
 * it is automatically calculate the hour of parking and price
 */

const updateBooking = asyncError(async (req, res, next) => {
    const schema = Joi.object({
        vehicleNumber: Joi.string().min(4).max(20).required(),
    })
    try {
        const value = await schema.validateAsync(req.body)
        const outtime = new Date()
        const getAllBooking = await Booking.findOne({ vehicleNumber: value.vehicleNumber })
        if (getAllBooking) {
            let totalHour = getTotalHour(getAllBooking.intime, outtime)
            let totalPrice = 0
            const vehicleType = await RateChart.findOne({ where: { vehicleType: getAllBooking.vehicleType } })
            if (vehicleType) {
                if (totalHour > 1)
                    totalPrice = vehicleType.price * totalHour
                else
                    totalPrice = vehicleType.price
            }
            const vehicleData = await Booking.findOneAndUpdate({ vehicleNumber: value.vehicleNumber }, { outtime, price: totalPrice, totalHour })
            res.status(201).json({ status: "success", data: { vehicleData } })

        } else {
            res.status(404).json({ status: "fail", data: { message:"vehicle data is not found" } })
        }
    } catch (error) {
        logger.error(error.message)
        next(error)
    }

})

function getTotalHour(intime, outtime) {
    let hour = (outtime.getTime() - intime.getTime()) / 1000;
    hour /= (60 * 60);
    return Math.abs(Math.round(hour));

}

module.exports = {
    createBooking, getBooking, updateBooking
}