const WordleAlgorithm = require( '../src/lib/WordleAlgorithm' );
const checkWord = require( '../src/lib/CheckWord' );

const lang = 'EN'; // TR | EN
const listType = 'selected'; // selected | full

let winTotal = 0;
let loseTotal = 0;
const winStatus = [
  { level : 1, total : 0 },
  { level : 2, total : 0 },
  { level : 3, total : 0 },
  { level : 4, total : 0 },
  { level : 5, total : 0 },
  { level : 6, total : 0 },
];
let avgWinLevel = 0;

const testInit = ( t ) => {
  try {
    const wordleAlgorithm = new WordleAlgorithm( lang, listType );
    const randomWord = wordleAlgorithm.getRandomWord();

    let tryWord;

    for ( let i = 1; i <= 6; i += 1 ) {
      tryWord = wordleAlgorithm.getRandomHitWord();

      if ( tryWord === randomWord ) {
        console.log( `RandomWord [${randomWord}] STATUS [WIN] STAGE IS [${i}]` );

        winStatus[i - 1].total += 1;
        avgWinLevel = ( ( avgWinLevel * t ) + i ) / ( t + 1 );
        winTotal += 1;

        return;
      }

      const checkStatus = checkWord( randomWord, tryWord );
      wordleAlgorithm.filterWord( checkStatus );
    }

    console.log( `RandomWord [${randomWord}] STATUS [LOSE]` );
    loseTotal += 1;
  } catch ( error ) {
    console.error( error );
  }
};

for ( let i = 0; i < 1000; i += 1 ) {
  testInit( i );
}

console.log( `##### WinTotal: ${winTotal}  LoseTotal: ${loseTotal} #####` );
console.log( `##### AvgWinLevel: ${avgWinLevel.toFixed( 8 )} #####` );
console.table( winStatus );
