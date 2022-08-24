require('babel-register')({
  presets: ['es2015', 'react'],
});

const router = require('./src/routes/sitemap').default;
const Sitemap = require('react-router-sitemap').default;

async function generateSitemap() {
  console.log(process.env.REACT_APP_API_BASE_URI);
  try {
    const idMap = [
      {
        id: 'football',
      },
      {
        id: 'leagues',
      },
      {
        id: 'bets',
      },
    ];

    const paramsConfig = {
      '/:id': idMap,
    };

    return new Sitemap(router)
      .applyParams(paramsConfig)
      .build(
        process.env.NODE_ENV === 'production'
          ? 'http://oddsbug.com'
          : 'https://staging.oddsbug.com',
      )
      .save('./public/sitemap.xml');
  } catch (e) {
    console.log(e);
  }
}

generateSitemap();
