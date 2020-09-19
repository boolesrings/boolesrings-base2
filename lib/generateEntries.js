const fs = require('fs');
const Parser = require('rss-parser');
const parser = new Parser();

const extractBlogEntries = async function (results, blog) {
  const sourcexml = './feeds/' + blog.id + '.xml';

  const xml = fs.readFileSync(sourcexml).toString();
  if (xml === '') return;
  const feed = await parser.parseString(xml);

  feed.items.forEach((item) => {
    const entry = {
      date: new Date(item.pubDate),
      postTitle: item.title,
      url: item.link,
      blogTitle: feed.title,
    };
    results.push(entry);
  });
};

module.exports = async (blogs) => {
  const results = [];
  for (let blog of blogs) {
    await extractBlogEntries(results, blog);
  }
  return results.sort((a, b) => b.date - a.date).slice(0, 25);
};
