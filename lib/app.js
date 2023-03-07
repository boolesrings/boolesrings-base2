const path = require('path');
const outputDir = path.resolve(process.argv[2]);
if (!outputDir) {
  console.warn('No CLI argument for target directory -- stopping');
  return;
}

const { execSync } = require('child_process');

const generateEntries = require('./generateEntries.js');
const publishCollection = require('./publishCollection.js');

const blogs = [
  {
    id: 0,
    url: 'https://scoskey.org/feed.xml',
  },
  {
    id: 1,
    url: 'http://www.peterkrautzberger.org/atom.xml',
  },
  {
    id: 2,
    url: 'http://normanspace.org/feed/',
  },
  {
    id: 3,
    url: 'https://victoriagitman.github.io/feed.xml',
  },
  {
    id: 4,
    url: 'http://www.dorais.org/feed.xml',
  },
  {
    id: 5,
    url: 'http://dcernst.github.io/feed.xml',
  },
  {
    id: 6,
    url: 'http://karagila.org/feed.xml',
  },
  //   {
  //     id: 7,
  //     feedURL: 'http://m6c.org/w/feed/',
  //
  //   },
  {
    id: 8,
    url: 'https://blog.assafrinot.com/?feed=rss2',
  },
  {
    id: '9',
    url: 'http://jdh.hamkins.org/feed/',
  },
  {
    id: 10,
    url: 'http://mikepawliuk.ca/feed/',
  },
  {
    id: 11,
    url: 'https://sixsmith2017.wordpress.com/feed/',
  },
  {
    id: 12,
    url: 'https://nickpgill.github.io/feed.xml',
  },
  {
    id: 13,
    url: 'https://muellersandra.github.io/feed.xml',
  },
  // {
  //   id: 14,
  //   url: 'https://ioa.re/posts.xml',
  // },
];

blogs.forEach((blog) => {
  try {
    execSync(
      `wget --quiet --retry-connrefused --waitretry=2 --read-timeout=3 --timeout=3 -t 3   ${blog.url} -O ./feeds/${blog.id}.xml`
    );
  } catch (e) {
    console.log(e.stderr);
  }
});

(async () => {
  const entries = await generateEntries(blogs);
  publishCollection('Blogs', outputDir, entries);
})();
