import Event from "../models/eventModel.js";

const createEvent = async(req, res) =>{
    try {
        const { postedBy, title, eventType, description, date, time, location, eligibility, link } = req.body;

        if(!postedBy || !title || !eventType || !description || !date || !time || !location ) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newEvent = new Event({
            postedBy,
            title,
            eventType,
            description,
            date,
            time,
            location,
            eligibility,
            link
        });

        await newEvent.save();

        res.status(200).json(newEvent);
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
}

export { createEvent };