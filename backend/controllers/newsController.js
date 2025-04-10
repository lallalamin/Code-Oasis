import axios from 'axios';
import * as cheerio from 'cheerio';

import puppeteer from 'puppeteer';

const scrapeTechNews = async (req, res) => {
  try {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    await page.goto('https://techcrunch.com/', {
      waitUntil: 'networkidle2',
      timeout: 0
    });

    const articles = await page.evaluate(() => {
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
        
        if (title && url) {
          items.push({ title, url, author, date, image });
        }
      });

      return items;
    });

    await browser.close();
    console.log('✅ Scraped articles:', articles.length);
    res.json(articles);
  } catch (err) {
    console.error('❌ Scraping failed:', err);
    res.status(500).json({ error: 'Failed to scrape tech news' });
  }
};


export { scrapeTechNews };