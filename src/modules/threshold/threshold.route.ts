import express from "express"
import {
    // getThresholds,
    // setThresholds,
    getRMSData,
    getUpdatedData,
    getFilteredData,
    getFilteredDataFFT,
    getThresholds,
    getSavedData,
    getMetrics,
    getFiltMetrics,
} from "./threshold.controller"

const router = express.Router()

//My code

// router.get("/", getThresholds)
router.post("/", getThresholds)
router.post("/filter", getFilteredData)
router.post("/filterfft", getFilteredDataFFT)
router.post("/rms", getRMSData)
router.post("/update", getUpdatedData)
router.post("/save", getSavedData)
router.post("/metrics", getMetrics)
router.post("/check", getFiltMetrics)
// router.put("/", setThresholds)

export default router
