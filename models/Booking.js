import mongoose, { mongo } from "mongoose";

const bookingSchema = mongoose.Schema({
    activity:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Activity',
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    },
    bookingDate:{
        type: Date,
        default: Date.now()
    }
});

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;