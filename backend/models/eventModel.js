import mongoose from "mongoose";

const eventSchema = mongoose.Schema({
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    eventType: {
        type: String,
        required: true
    },
    eligibility: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    timezone: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: false
    }
},{
    timestamps: true
});

const Event = mongoose.model("Event", eventSchema);

export default Event;