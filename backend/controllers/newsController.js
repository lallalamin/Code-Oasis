import News from '../models/newsModel.js';
import puppeteer from 'puppeteer';

const scrapeTechNews = async () => {
  try {
    console.log('📰 Start Scraping tech news...');
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    const allArticles = [];

    await page.goto('https://techcrunch.com/', {
      waitUntil: 'networkidle2',
      timeout: 0
    });

    const techcruncharticles = await page.evaluate(() => {
      const items = [];

      const cards = document.querySelectorAll('.loop-card');
      const isWithinDateRange = (date) => {
        const today = new Date();
        const articleDate = new Date(date);
        const diff = today - articleDate;
        const oneday = 24 * 60 * 60 * 1000; 
        return diff <= oneday *2;
      };
      cards.forEach(card => {
        const titleEl = card.querySelector('.loop-card__title-link');
        const authorEl = card.querySelector('.loop-card__author');
        const dateEl = card.querySelector('time');
        const imageEl = card.querySelector('img');

        const title = titleEl?.innerText?.trim();
        const url = titleEl?.href;
        const author = authorEl?.innerText?.trim();
        const date = dateEl?.getAttribute('datetime');
        const image = imageEl?.getAttribute('src');
        
        if (title && url && author && isWithinDateRange(date) && image) {
          items.push({ title, url, author, date, image, source: 'TechCrunch' });
        }
      });

      return items;
    });

    allArticles.push(...techcruncharticles);

    await page.goto('https://venturebeat.com/', {
      waitUntil: 'networkidle2',
      timeout: 0
    });

    const ventureBeatArticles = await page.evaluate(() => {
      const items = [];
      const cards = document.querySelectorAll('article.ArticleListing');

      const isWithinDateRange = (date) => {
        const today = new Date();
        const articleDate = new Date(date);
        const diff = today - articleDate;
        const oneday = 24 * 60 * 60 * 1000; 
        return diff <= oneday *2;
      };
    
      cards.forEach(card => {
        const titleEl = card.querySelector('a.ArticleListing__title-link');
        const url = titleEl?.href;
        const title = titleEl?.innerText?.trim();
    
        const imageEl = card.querySelector('a.ArticleListing__image-link img');
        const image = imageEl?.getAttribute('src');
    
        const authorEl = card.querySelector('a.ArticleListing__author');
        const author = authorEl?.innerText?.trim() || 'VentureBeat';
    
        const dateEl = card.querySelector('time.ArticleListing__time');
        const date = dateEl?.getAttribute('datetime') || '';
    
        if (title && url && image && author && isWithinDateRange(date)) {
          items.push({ title, url, author, date, image, source: 'VentureBeat' });
        }
      });
    
      return items;
    });

    allArticles.push(...ventureBeatArticles);

    await browser.close();
    await News.deleteMany({});
    await News.insertMany(allArticles);
    console.log('✅ Scraping completed:', allArticles.length, 'articles found.');
  } catch (err) {
    console.error('❌ Scraping failed:', err);
  }
};

const getTechNews = async (req, res) => {
  try {
    const news = await News.find({}).sort({ createdAt: -1 });
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tech news' });
  }
}


export { scrapeTechNews, getTechNews };