import axios from 'axios';
import * as cheerio from 'cheerio';

const scrapeTechNews = async (req, res) => {
  try {
    const response = await axios.get('https://techcrunch.com/');
    const $ = cheerio.load(response.data);
    const articles = [];

    $('.post-block').each((i, el) => {
      const title = $(el).find('.post-block__title__link').text().trim();
      const url = $(el).find('.post-block__title__link').attr('href');
      const author = $(el).find('.river-byline__authors a').text().trim();
      const date = $(el).find('time').attr('datetime');
      const image = $(el).find('img').attr('src');
      const description = $(el).find('.post-block__content').text().trim();

      if (title && url) {
        articles.push({ title, url, author, date, image, description });
      }
    });

    console.log('Scraped articles:', articles);

    res.json(articles);
  } catch (err) {
    console.error('Scraping failed:', err);
    res.status(500).json({ error: 'Failed to fetch tech news' });
  }
};

export { scrapeTechNews };