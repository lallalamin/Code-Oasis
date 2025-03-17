import Event from "../models/eventModel.js";
import User from "../models/userModel.js";

const getAllEvents = async(req, res) => {
    try {
        const events = await Event.find({});
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
}

const getUserEvents = async(req, res) => {
    const userId = req.params.id;
    try {
        const events = await Event.find({ postedBy: userId });
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
}
const createEvent = async(req, res) =>{
    try {
        const { postedBy, title, eventType, description, startDate, endDate, registrationDeadline, time, timezone, location, lat, lng, isVirtual, eligibility, link } = req.body;
        console.log("Request body:", req.body);

        if(!postedBy || !title || !eventType || !description || !time ) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const newEvent = new Event({
            postedBy,
            title,
            eventType,
            description,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            registrationDeadline: registrationDeadline,
            time,
            timezone,
            location,
            lat,
            lng,
            isVirtual,
            eligibility,
            link
        });

        const user = await User.findById(postedBy);
        user.xp += 10;
        await user.save();

        await newEvent.save();
        console.log("Event created:", newEvent);
        res.status(200).json(newEvent);
    } catch (error) {
        console.log("Error creating event:", error);
        res.status(500).json({ error: error.message})
    }
}

const editEvent = async(req, res) =>{
    const eventId = req.params.id;
    const userId = req.user._id;
    try {
        const { title, eventType, description, startDate, endDate, registrationDate, time, timezone, location, lat, lng, isVirtual, eligibility, link } = req.body;

        const event = await Event.findById(eventId);

        if(!event) {
            console.log("Event not found");
            return res.status(404).json({ error: "Event not found" });
        }

        if(event.postedBy.toString() !== userId.toString()) {
            return res.status(401).json({ error: "Unauthorized to edit event" });
        }

        event.title = title;
        event.eventType = eventType;
        event.description = description;
        event.startDate = new Date(startDate);
        event.endDate = new Date(endDate);
        event.registrationDeadline = registrationDate;
        event.time = time;
        event.timezone = timezone;
        event.location = location;
        event.lat = lat;
        event.lng = lng;
        event.isVirtual = isVirtual;
        event.eligibility = eligibility;
        event.link = link;

        await event.save();

        console.log("Event updated:", event);

        res.status(200).json(event);
        
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
}

const deleteEvent = async(req, res) => {
    const eventId = req.params.id;
    const userId = req.user._id;
    try {
        const event = await Event.findById(eventId);

        if(!event) {
            return res.status(404).json({ error: "Event not found" });
        }

        if(event.postedBy.toString() !== userId.toString()) {
            return res.status(401).json({ error: "Unauthorized to delete event" });
        }

        await Event.findByIdAndDelete(eventId);

        res.status(200).json({ message: "Event deleted successfully" });

    } catch (error) {
        res.status(500).json({ error: error.message})
    }
}

export { createEvent, getAllEvents, editEvent, deleteEvent, getUserEvents };