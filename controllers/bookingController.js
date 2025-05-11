import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import Activity from "../models/Activity.js";
import Booking from "../models/Booking.js";

//book and activity
const bookActivity = catchAsyncError(async (req, res) => {
  const { activityId } = req.body;

  if (!activityId) {
    return next(new ErrorHandler("Please provide an Activity ID", 400));
  }

  //checking if activity exists
  const activity = await Activity.findById( activityId );

  if (!activity) {
    return next(new ErrorHandler("Activity not found", 404));
  }

  //checking if user has already booked this activity
  const existingBooking = await Booking.findOne({
    user: req.user.id,
    activity: activityId,
  });
  if (existingBooking) {
    return next(new ErrorHandler("You have already booked this activity", 400));
  }

  //create new booking
  const booking = await Booking.create({
    activity: activityId,
    user: req.user.id,
  });

  await booking.populate("activity");

  res.status(201).json({
    success: true,
    message: "Activity booked successfully",
    data: booking,
  });
});

//get logged in users booking
const getMyBookings = catchAsyncError(async (req, res) => {
  const bookings = await Booking.find({ user: req.user.id })
    .populate("activity")
    .sort({ bookingDate: -1 });

  res.status(200).json({
    success: true,
    count: bookings.length,
    data: bookings,
  });
});

export { bookActivity, getMyBookings };
