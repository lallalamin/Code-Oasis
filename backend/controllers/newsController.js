import News from '../models/newsModel.js';
import puppeteer from 'puppeteer';

const scrapeTechNews = async (req, res) => {
  try {
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
      cards.forEach(card => {
        const titleEl = card.querySelector('.loop-card__title-link');
        const authorEl = card.querySelector('.loop-card__author');
        const dateEl = card.querySelector('time');
        const imageEl = card.querySelector('img');

        const title = titleEl?.innerText?.trim();
        const url = titleEl?.href;
        const author = authorEl?.innerText?.trim() || 'Unknown';
        const date = dateEl?.getAttribute('datetime');
        const image = imageEl?.getAttribute('src');
        
        if (title && url && author && date && image) {
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
    
        if (title && url　&& image && author && date) {
          items.push({ title, url, author, date, image, source: 'VentureBeat' });
        }
      });
    
      return items;
    });

    allArticles.push(...ventureBeatArticles);

    await browser.close();
    console.log('✅ Scraped articles:', allArticles.length);
    res.json(allArticles);
  } catch (err) {
    console.error('❌ Scraping failed:', err);
    res.status(500).json({ error: 'Failed to scrape tech news' });
  }
};


export { scrapeTechNews };