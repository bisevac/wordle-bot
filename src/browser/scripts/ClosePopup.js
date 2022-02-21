module.exports = async ( page ) => {
  // Click Close Poppup Button
  await page.evaluate( () => {
    document.querySelector( 'body > game-app' ).shadowRoot
      .querySelector( '#game > game-modal' ).shadowRoot
      .querySelector( 'div > div > div' ).click();
  } );
};
