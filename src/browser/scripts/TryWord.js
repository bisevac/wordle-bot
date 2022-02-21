module.exports = async ( page, word ) => {
  for ( let i = 0; i < word.length; i += 1 ) {
    const letter = word[i];

    await page.evaluate( ( l ) => {
      document.querySelector( 'body > game-app' ).shadowRoot
        .querySelector( '#game > game-keyboard' ).shadowRoot
        .querySelectorAll( '#keyboard > div > button' ).forEach( ( b ) => {
          if ( b.getAttribute( 'data-key' ) === l ) {
            b.click();
          }
        } );
    }, letter );
  }

  await page.keyboard.press( 'Enter' );
};
