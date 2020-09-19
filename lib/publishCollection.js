const fs = require('fs');
const path = require('path');
const Feed = require('rss'); // to create feed objects

module.exports = function (cat, directory, entries) {
  const category = cat.replace(/&/g, '&amp;');
  const filename = cat;

  let theHTML =
    '---\n' +
    'layout: page\n' +
    'title: ' +
    category +
    '\n' +
    'feedLink: ' +
    filename +
    '\n' +
    '---\n\n';
  theHTML += '<ul class="entry-list">\n';

  entries.forEach((entry) => {
    theHTML += `<li><a class="entry-title" href="${
      entry.url
    }" rel="nofollow"><time\ datetime="${
      entry.date
    }" class="entry-date">${new Date(entry.date)
      .toUTCString()
      .substring(5, 16)}</time>${entry.postTitle}<span class="entry-blog">${
      entry.blogTitle
    }</span></a></li>\n`;
  });

  theHTML += '</ul>\n';
  theHTML +=
    '<p> <a href="' +
    filename +
    '.xml">' +
    'Grab the feed for our blogs!</a></p>\n';

  fs.writeFileSync(path.resolve(directory, filename + '.html'), theHTML);

  const theFeed = new Feed({
    title: "Booles' Rings -- " + category,
    description: 'Researchers. Connecting.',
    pubDate: new Date(),
    feed_url: 'https://boolesrings.org/' + category + '.xml',
    site_url: 'https://boolesrings.org/',
    copyright:
      'No copyright asserted over individual posts; see original posts for copyright and/or licensing.',
    managingEditor: 'info@boolesrings.org',
  });

  entries.forEach((entry) => {
    const itemOptions = {
      date: entry.date,
      title: entry.postTitle,
      url: encodeURI(entry.url),
      guid: entry.url,
      description: '',
      author: entry.blogTitle,
    };
    theFeed.item(itemOptions);
  });
  const xml = theFeed.xml({
    indent: true,
  });
  fs.writeFileSync(path.resolve(directory, filename + '.xml'), xml);
};
