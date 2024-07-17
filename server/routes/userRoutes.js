import express from "express";
import { 
    addtoPlayList,
    changePassword, 
    deleteMyProfile, 
    deleteUser, 
    forgotPassword, 
    getAllUser, 
    getMyProfile, 
    login, 
    logout, 
    register, 
    removeFromPlayList, 
    resetPassword, 
    updateProfile,
    updateProfilePicture,
    updateUserRole
} from "../controllers/userController.js";
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";
import singleUpload from "../middlewares/multer.js";
const router = express.Router();

router.route('/register').post(singleUpload, register)
router.route('/login').post(login)
router.route('/logout').get(logout)
router.route('/me').get(isAuthenticated, getMyProfile)
router.route('/changepassword').put(isAuthenticated, changePassword)
router.route('/updateprofile').put(isAuthenticated, updateProfile)
router.route('/updateprofilepicture').put(isAuthenticated,singleUpload, updateProfilePicture)
router.route('/me').delete(isAuthenticated,deleteMyProfile)

router.route('/forgotpassword').post(forgotPassword)
router.route('/resetpassword/:token').put(resetPassword)

router.route('/addtoplaylist').post(isAuthenticated,addtoPlayList)
router.route('/removefromplaylist').delete(isAuthenticated,removeFromPlayList)

//admin routes
router.route('/admin/users').get(isAuthenticated,authorizeAdmin, getAllUser)
router.route('/admin/user/:id')
.put(isAuthenticated,authorizeAdmin, updateUserRole)
.delete(isAuthenticated,authorizeAdmin,deleteUser)

export default router;