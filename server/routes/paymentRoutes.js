import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { 
    buySubscription,
    cancelSubscription,
    getRazorpayKey, 
    paymentverification 
} from "../controllers/paymentController.js";

const router = express.Router();

router.route('/subscribe').get(isAuthenticated,buySubscription)

//verify payment adn save reference in database
router.route('/paymentverification').post(isAuthenticated,paymentverification)


//get Razorpay key
router.route('/razorpaykey').get(isAuthenticated,getRazorpayKey)
//cancel subscription
router.route('/subscribe/cancel').delete(isAuthenticated,cancelSubscription)

export default router;