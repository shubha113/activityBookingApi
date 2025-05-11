import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import Activity from "../models/Activity.js";
import ErrorHandler from "../utils/errorHandler.js";


//create actvity
const createActivity = catchAsyncError(async(req, res)=>{
    const {title, description, location, dateTime} = req.body;

    //validating input
    if(!title || !description || !location || !dateTime){
        return next(new ErrorHandler("All fields are required", 400))
    }

    //create activity
    const activity = await Activity.create({
        title,
      description,
      location,
      dateTime: new Date(dateTime)
    })

    res.status(201).json({
        success: true,
        message: "Activity created successfully",
        data: activity
    })
})


//get all activities
const getActivities = catchAsyncError(async(req, res)=>{
    const activities = await Activity.find().sort({dateTime: 1});

    res.status(200).json({
        success: true,
        count: activities.length,
        data: activities
    });
});

// get single actvity
const getActivity = catchAsyncError(async(req, res)=>{
    const activity = await Activity.findById(req.params.id);

    if(!activity){
        return next (new ErrorHandler('Activity not found', 404))
    }

    res.status(200).json({
        success: true,
        data: activity
    })
})

export {getActivities, getActivity, createActivity};