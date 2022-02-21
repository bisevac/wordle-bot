const BrowserLaunch = require( './browser/BrowserLaunch' );
const BrowserNavitage = require( './browser/scripts/BrowserNavitage' );
const StageIsWin = require( './lib/StageIsWin' );
const { exitProcess } = require( './lib/util' );
const WordleAlgorithm = require( './lib/WordleAlgorithm' );
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
    const wordleAlgorithm = new WordleAlgorithm( lang, listType );

    for ( let i = 1; i <= 6; i += 1 ) {
      const randomWord = wordleAlgorithm.getRandomHitWord();
      await TryWord( page, randomWord );

      await page.waitForTimeout( 2000 );
      const stageStatus = await GetStatus( page, i );
      if ( StageIsWin( stageStatus ) ) {
        console.log( `#### WIN WORD IS -> '${randomWord}'` );
        break;
      }

      wordleAlgorithm.filterWord( stageStatus );
      await page.waitForTimeout( 500 );
    }
  } catch ( error ) {
    console.error( error );
  } finally {
    exitProcess();
  }
} )();
