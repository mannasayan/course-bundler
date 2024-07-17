import express from "express";
import { 
    addLectures,
    createCourse, 
    deleteCourse, 
    deleteLectures, 
    getAllCourses, 
    getCourseLectures
} from "../controllers/courseController.js";
import singleUpload from "../middlewares/multer.js";
import { authorizeAdmin, authorizeSubscribe, isAuthenticated } from "../middlewares/auth.js";
const router = express.Router();
//Get All Courses without Lectures
router.route('/courses').get(getAllCourses)

//create new course  - admin
router.route('/createcourse').post(isAuthenticated, authorizeAdmin, singleUpload, createCourse)

//add lectures
router.route('/course/:id')
.get(isAuthenticated,authorizeSubscribe, getCourseLectures)
.post(isAuthenticated, authorizeAdmin, singleUpload, addLectures)
.delete(isAuthenticated, authorizeAdmin, deleteCourse)

//delete lectures
router.route('/lecture').delete(isAuthenticated, authorizeAdmin, deleteLectures)


export default router;