const asyncError = require("../utils/asyncError")
const Joi = require("joi")
const logger = require("../utils/logger")
const RateChart = require("../models/rateChart")

/**
 * GetRateChart
 * It is use to get the ratechart from database.
 * If we are pass vehicle type then we will get individual vehicletype rate
 */

const getRateChart = asyncError(async (req, res, next) => {
    const schema = Joi.object({
        vehicleType: Joi.string().valid("twoWheeler", "hatchbackCar", "suvCar"),
    })

    try {
        let rateData = {}
        if (req.body) {
            const value = await schema.validateAsync(req.body)
            rateData.vehicleType = value.vehicleType
        }
        const getRateChartDetails = await RateChart.find(rateData)
        if(getRateChartDetails)
        res.status(200).json({ status: "success", data: { getRateChartDetails } })
        else
        res.status(204).json({ status: "success", data: { message:"ratechart not available for perticular type of vehicle" } })
    } catch (error) {
        logger.error(error.message)
        next(error)
    }
})


/**
 * CreateRateChart
 * It is use to create new chart record as per vehicle type
 */

const createRateChart = asyncError(async (req, res, next) => {
    const schema = Joi.object({
        vehicleType: Joi.string().valid("twoWheeler", "hatchbackCar", "suvCar").required(),
        price: Joi.number()
    })
    try {
        const value = await schema.validateAsync(req.body)
        const createRateChart = await RateChart.create(value)
        res.status(201).json({ status: "success", data: { createRateChart } })
    } catch (error) {
        logger.error(error.message)
        next(error)
    }
})

/**
 * UpdateRateChart
 * It is used to update rate chart as per vehicletype
 */

const updateRateChart = asyncError(async (req, res, next) => {
    const schema = Joi.object({
        vehicleType: Joi.string().valid("twoWheeler", "hatchbackCar", "suvCar").required(),
        price: Joi.number()
    })
    try {
        const value = await schema.validateAsync(req.body)
        const updateRateChart = await RateChart.findOneAndUpdate({ vehicleType: value.vehicleType }, value)
        res.status(201).json({ status: "success", data: { updateRateChart } })
    } catch (error) {
        logger.error(error.message)
        next(error)
    }

})


module.exports = {
    createRateChart, getRateChart, updateRateChart
}