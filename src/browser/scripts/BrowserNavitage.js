module.exports = async ( page, lang = 'EN' ) => {
  if ( lang === 'EN' ) {
    await page.goto( 'https://www.nytimes.com/games/wordle/index.html' );
  } else if ( lang === 'TR' ) {
    await page.goto( 'https://www.bundle.app/wordle-tr/' );
  } else {
    throw new Error( 'Unexpected lang' );
  }
};
