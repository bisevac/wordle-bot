const puppeteer = require( 'puppeteer' );

module.exports = async () => {
  const optArgs = [
    '--start-maximized',
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-gpu',
    '--single-process',
    '--incognito',
  ];

  const options = {
    headless        : false,
    args            : optArgs,
    defaultViewport : null,
    waitUntil       : 'networkidle2',
  };

  const browser = await puppeteer.launch( options );

  return browser;
};
