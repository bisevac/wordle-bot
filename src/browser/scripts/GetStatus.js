module.exports = async ( page, stage ) => {
  const stageStatus = [
    /**
     * @Object
     * order  : 1,
     * letter : 'm',
     * status : 'present' | 'correct' | 'absent',
     * */
  ];

  for ( let i = 1; i <= 5; i += 1 ) {
    const status = await page.evaluate( ( s, k ) => {
      const lt =  document.querySelector( 'body > game-app' ).shadowRoot
        .querySelector( `#board > game-row:nth-child(${s})` ).shadowRoot
        .querySelector( `div > game-tile:nth-child(${k})` )
        .getAttribute( 'letter' );

      const st = document.querySelector( 'body > game-app' ).shadowRoot
        .querySelector( `#board > game-row:nth-child(${s})` ).shadowRoot
        .querySelector( `div > game-tile:nth-child(${k})` ).shadowRoot
        .querySelector( 'div' ).getAttribute( 'data-state' );

      return { status : st, letter : lt };
    }, stage, i );

    stageStatus.push( { ...status, order : i } );
  }

  return stageStatus;
};
