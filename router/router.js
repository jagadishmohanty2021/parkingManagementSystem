const router=require('express').Router()
const booking=require("../controller/booking")
const parkingLots=require("../controller/parkingLots")
const rateChart=require("../controller/rateChart")

/**
 * This route is for all booking related api
 */
router.route("/booking")
.get(booking.getBooking)
.post(booking.createBooking)
.put(booking.updateBooking)


/**
 * This route is for all parkinglots related api
 */

router.route("/parkinglots")
.get(parkingLots.getParkingLot)
.post(parkingLots.createParkingLot)
.put(parkingLots.updateParkingLot)

/**
 * This route is for all ratechart related api
 */

router.route("/ratechart")
.get(rateChart.getRateChart)
.post(rateChart.createRateChart)
.put(rateChart.updateRateChart)


module.exports=router;