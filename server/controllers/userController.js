import { catachAsyncErrors } from "../middlewares/catchAsyncError.js";
import { User } from "../models/User.js"
import { Course } from "../models/Course.js"
import ErrorHandler from "../utils/ErrorHandler.js";
import { sendEmail } from "../utils/sendEmail.js";
import { sendToken } from "../utils/sendToken.js";
import crypto from 'crypto';
import cloudinary from 'cloudinary'
import getDataUri from "../utils/dataUri.js";
import { Stats } from '../models/Stats.js'


//register
export const register = catachAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;


    if (!name || !email || !password)
        return next(new ErrorHandler("Please enter all fields", 400))

    let user = await User.findOne({ email });
    if (user) return next(new ErrorHandler("User already exists", 400))

    //upload file on cloudinary
    const file = req.file;

    const fileUri = getDataUri(file);
    const myCloud = await cloudinary.v2.uploader.upload(fileUri.content)


    user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        }
    })
    sendToken(res, user, "Register Successfully", 201)

})

//Login
export const login = catachAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password)
        return next(new ErrorHandler("Please enter all fields", 400))

    let user = await User.findOne({ email }).select("+password");
    if (!user) return next(new ErrorHandler("Incorrect Email or Password", 401))

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return next(new ErrorHandler("Incorrect Email or Password", 401))

    sendToken(res, user, `Welcome Back ${user.name}`, 200)

})

//logout 
export const logout = catachAsyncErrors(async (req, res, next) => {
    res.status(200)
        .cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: false,
            secure: true,
            sameSite: "None",
            withCredentials: true,
        }).json({
            success: true,
            message: "Logged Out successfully!"
        })
})

//get My Profile 
export const getMyProfile = catachAsyncErrors(async (req, res, next) => {

    const user = await User.findById(req.user._id);

    res.status(200).json({
        success: true,
        user
    })
})

//changePassword
export const changePassword = catachAsyncErrors(async (req, res, next) => {

    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword)
        return next(new ErrorHandler("Please enter all fields", 400))

    const user = await User.findById(req.user._id).select("+password");

    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch) return next(new ErrorHandler("Incorrect Old Password", 400))

    user.password = newPassword;

    await user.save();

    res.status(200).json({
        success: true,
        message: "Password changed successfully"
    })
})

//updateProfile
export const updateProfile = catachAsyncErrors(async (req, res, next) => {

    const { name, email } = req.body;

    const user = await User.findById(req.user._id);

    if (name) user.name = name;
    if (email) user.email = email;

    await user.save();

    res.status(200).json({
        success: true,
        message: "Update Profile successfully"
    })
})

//updateProfile picture
export const updateProfilePicture = catachAsyncErrors(async (req, res, next) => {

    const user = await User.findById(req.user._id)
    const file = req.file;

    const fileUri = getDataUri(file);
    const myCloud = await cloudinary.v2.uploader.upload(fileUri.content)

    await cloudinary.v2.uploader.destroy(user.avatar.public_id);

    user.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
    }

    await user.save();

    res.status(200).json({
        success: true,
        message: "Profile Picture Updated successfully"
    })
})


//forgotPassword
export const forgotPassword = catachAsyncErrors(async (req, res, next) => {

    const { email } = req.body;

    const user = await User.findOne({ email })
    if (!user) return next(new ErrorHandler("User not found", 404))

    const resetToken = await user.getResetToken();
    await user.save();

    const url = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`
    const message = `Click on the link to reset your password. ${url}. if you have not requested then please ignore`

    //send Token via email
    await sendEmail(user.email, "CourseBundler Reset Password", message)

    res.status(200).json({
        success: true,
        message: `Reset Token has sent to ${user.email}`,
    })
})

//resetPassword
export const resetPassword = catachAsyncErrors(async (req, res, next) => {

    const { token } = req.params;

    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: {
            $gt: Date.now(),
        },
    })
    if (!user) return next(new ErrorHandler("Token is invalid or has been expired", 400))

    user.password = req.body.password;
    user.resetPasswordExpire = undefined;
    user.resetPasswordToken = undefined;
    await user.save()

    res.status(200).json({
        success: true,
        message: "Password Changed Successfully!",
    })
})





//add to playlist
export const addtoPlayList = catachAsyncErrors(async (req, res, next) => {

    const user = await User.findById(req.user._id)

    const course = await Course.findById(req.body.id)

    if (!course) return next(new ErrorHandler("Invalid Course Id", 404))

    const itemExits = user.playlist.find((item) => {
        if (item.course.toString() === course._id.toString()) return true;
    })

    if (itemExits) return next(new ErrorHandler("Item Already Exits", 409))

    user.playlist.push({
        course: course._id,
        poster: course.poster.url,
    })
    await user.save();
    res.status(200).json({
        success: true,
        message: "Added to Playlist",
    })

})

//remove from playlist
export const removeFromPlayList = catachAsyncErrors(async (req, res, next) => {

    const user = await User.findById(req.user._id)

    const course = await Course.findById(req.query.id)

    if (!course) return next(new ErrorHandler("Invalid Course Id", 404))

    const newPlaylist = user.playlist.filter((item) => {
        if (item.course.toString() !== course._id.toString()) return item
    })

    user.playlist = newPlaylist;
    await user.save();

    res.status(200).json({
        success: true,
        message: "Remove From Playlist",
    })

})


//delete My profile
export const deleteMyProfile = catachAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user._id)
    if (!user) return next(new ErrorHandler("User Not Found", 404))

    await cloudinary.v2.uploader.destroy(user.avatar.public_id)

    //cancel Subscription

    await user.deleteOne()

    res.status(200).cookie("token", null, {
        expires: new Date(Date.now())
    }).json({
        success: true,
        message: "User Deleted Successfully",
    })
})


//get all user - admin

export const getAllUser = catachAsyncErrors(async (req, res, next) => {
    const user = await User.find({});

    // sendToken(res,user,"Successfully get all user",200)
    res.status(200).json({
        success: true,
        user
    })

})

//update user role -admin

export const updateUserRole = catachAsyncErrors(async (req, res, next) => {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) return next(new ErrorHandler("User Not Found", 404))

    if (user.role === 'user') {
        user.role = 'admin'
    } else {
        user.role = "user";
    }
    await user.save()

    res.status(200).json({
        success: true,
        message: "User Role Updated",
        user
    })

})

//delete user -admin
export const deleteUser = catachAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id)
    if (!user) return next(new ErrorHandler("User Not Found", 404))

    await cloudinary.v2.uploader.destroy(user.avatar.public_id)

    //cancel Subscription

    await user.deleteOne()

    res.status(200).json({
        success: true,
        message: "User Deleted Successfully",
    })
})

User.watch().on("change", async () => {

    const stats = await Stats.find({}).sort({ createdAt: "desc" }).limit(1);

    const subscription = await User.find({ "subscription.status": "active" });

    stats[0].users = await User.countDocuments();
    stats[0].subscription = subscription.length;
    stats[0].createdAt = new Date(Date.now());

    await stats[0].save();

})