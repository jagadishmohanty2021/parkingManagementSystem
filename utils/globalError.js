const logger=require("../utils/logger")
module.exports = (error, req, res, next) => {
    error.statusCode = error.statusCode || 500
    error.status = error.status || "fail"
    logger.error("hello")
    res.status(error.statusCode).json({ status: error.status, message: error.message })
}