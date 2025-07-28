import express from "express"
import { protectAdmin } from "../middleware/auth.js";
import { getAllBookings, getAllShows, getDashboardData, isAdmin } from "../controllers/adminController.js";


const adminRouter = express.Router();

adminRouter.get("/is-admin" , protectAdmin , isAdmin )
adminRouter.get("/dashboard" , protectAdmin, getDashboardData)
adminRouter.get("/all-shows" , getAllShows, protectAdmin)
adminRouter.get("/all-bookings" , protectAdmin, getAllBookings)


export default  adminRouter;