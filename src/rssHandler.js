const Parser = require('rss-parser');

async function getLatestItems() {
  try {
    const parser = new Parser();
    const diFeedPromise = await parser.parseURL('https://www.di.se/rss');
    const latestDIFeed = await Promise.resolve(diFeedPromise);
    
    latestDIFeed.items.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
    return latestDIFeed.items.slice(0, 10);
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch latest items from DI RSS feed');
  }
}

module.exports = {
  getLatestItems
};
