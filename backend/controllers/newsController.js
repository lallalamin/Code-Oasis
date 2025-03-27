import axios from 'axios';

const scrapTechNews = async (req, res) => {
    try {
        console.log("Scraping TechNews...");
        
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export {scrapTechNews};