import mongoose from "mongoose";

const activitySchema = mongoose.Schema({
    title:{
        type: String,
        required: [true, "Activity title is required"],
        trim: true
    },
    description:{
        type: String,
        required: [true, "Activity descption is required"],
        trim: true
    },
    location:{
        type: String,
        required: [true, "Activiyt location is required"],
        trim: true
    },
    dateTime:{
        type: Date,
        required: [true, "Activity Date and Time are required"]
    },
    createdAt:{
        type: Date,
        dafault: Date.now()
    }
});

const Activity = mongoose.model("Activity", activitySchema);
export default Activity;