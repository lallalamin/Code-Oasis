import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true
    },
    url: {
        type: String, 
        required: true
    },
    author: {
        type: String, 
        required: true
    },
    date: {
        type: String, 
        required: true
    },
    image: {
        type: String, 
        required: true
    },
    source: {
        type: String, 
        required: true
    },
},{timestamps: true})

const News = mongoose.model("News", newsSchema);

export default News;

