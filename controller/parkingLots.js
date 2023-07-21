const asyncError = require("../utils/asyncError")
const Parking = require("../models/parkingLots")
const Joi = require("joi")
const logger = require("../utils/logger")


/**
 * GetParkingLot api
 * it is use to get the all parkinglots details
 */
const getParkingLot = asyncError(async (req, res, next) => {
    try {
        const getParkingDetails = await Parking.find()
        res.status(200).json({ status: "success", data: { getParkingDetails } })
    } catch (error) {
        logger.error(error.message)
        next(error)
    }
})

/**
 * CreateParkingLot
 * It is use to create new parking lot
 */
const createParkingLot = asyncError(async (req, res, next) => {
    const schema = Joi.object({
        parkingName: Joi.string().min(4).max(20).required(),
        twoWheeler: Joi.number(),
        hatchbackCar: Joi.number(),
        suvCar: Joi.number()
    })
    try {
        const value = await schema.validateAsync(req.body)
        const createUserData = await Parking.create(value)
        res.status(201).json({ status: "success", data: { createUserData } })
    } catch (error) {
        logger.error(error.message)
        next(error)
    }
})

/**
 * UpdateParkingLot
 * It is update the parkinglot details in database
 */

const updateParkingLot = asyncError(async (req, res, next) => {
    const schema = Joi.object({
        parkingName: Joi.string().min(4).max(20).required(),
        twoWheeler: Joi.number(),
        hatchbackCar: Joi.number(),
        suvCar: Joi.number()
    })
    try {
        const value = await schema.validateAsync(req.body)
        let updateData={}
        if(value.twoWheeler){
            updateData.twoWheeler=value.twoWheeler
        }
        if(value.hatchbackCar){
            updateData.hatchbackCar=value.hatchbackCar
        }
        if(value.suvCar){
            updateData.suvCar=value.suvCar
        }
        const updateLotData=await Parking.findOneAndUpdate({parkingName:value.parkingName},updateData)

        res.status(201).json({ status: "success", data: { updateLotData } })
    } catch (error) {
        logger.error(error.message)
        next(error)
    }

})


module.exports = {
    createParkingLot, getParkingLot, updateParkingLot
}