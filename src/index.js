const BrowserLaunch = require( './browser/BrowserLaunch' );
const BrowserNavitage = require( './browser/scripts/BrowserNavitage' );
const StageIsWin = require( './lib/StageIsWin' );
const { exitProcess } = require( './lib/util' );
const WordAlgorithm = require( './lib/WordAlgorithm' );
const GetStatus = require( './browser/scripts/GetStatus' );
const TryWord = require( './browser/scripts/TryWord' );
const ClosePopup = require( './browser/scripts/ClosePopup' );

const lang = process.env.WORDLE_LANG || 'EN';
const listType = process.env.LIST_TYPE || 'selected';

( async () => {
  try {
    const browser = await BrowserLaunch();
    const page = ( await browser.pages() )[0];

    await BrowserNavitage( page, lang );
    await page.waitForTimeout( 1000 );

    await ClosePopup( page );

    await page.waitForTimeout( 500 );
    const wordAlgorithm = new WordAlgorithm( lang, listType );

    for ( let i = 1; i <= 6; i += 1 ) {
      const randomWord = wordAlgorithm.getRandomHitWord();
      await TryWord( page, randomWord );

      await page.waitForTimeout( 2000 );
      const stageStatus = await GetStatus( page, i );
      if ( StageIsWin( stageStatus ) ) {
        console.log( `#### WIN WORD IS -> '${randomWord}'` );
        break;
      }

      wordAlgorithm.filterWord( stageStatus );
      await page.waitForTimeout( 500 );
    }
  } catch ( error ) {
    console.error( error );
  } finally {
    exitProcess();
  }
} )();
