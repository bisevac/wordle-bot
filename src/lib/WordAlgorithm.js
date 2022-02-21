const fs = require( 'fs' );
const path = require( 'path' );

class WordAlgorithm {
  constructor ( lang = 'EN', listType = 'selected' ) {
    // console.log( `WordAlgorithm Called, ${lang} ${listType}` );

    const filePath = path.resolve( __dirname, `../../words/${lang}_${listType}_word_list.json` );
    this.words = JSON.parse( fs.readFileSync( filePath ) );
    this.filters = [];
  }

  getRandomWord () {
    return this.words[Math.floor( Math.random() * this.words.length )];
  }

  getRandomHitWord () {
    let hitWords = [];
    let maxP = 0;

    for ( let i = 0; i < this.words.length; i += 1 ) {
      const word = this.words[i];

      let p = 0;
      const existsLetter = [];
      for ( let k = 0; k < word.length; k += 1 ) {
        const letter = word[k];

        if ( !this.filters.some( ( f ) => f.letter === letter ) && !existsLetter.includes( letter ) ) {
          existsLetter.push( letter );
          p += 1;
        }
      }

      if ( p > maxP ) {
        maxP = p;
        hitWords = [word];
      } else if ( p === maxP ) {
        hitWords.push( word );
      }
    }

    const randomHitWord = hitWords[Math.floor( Math.random() * hitWords.length )];

    return randomHitWord;
  }

  filterWord ( filters ) {
    this.filters.push( ...filters );

    for ( let i = 0; i < filters.length; i += 1 ) {
      const filter = filters[i];

      this.filterLetter( filter );
    }
  }

  /**
   * @Object
   * order  : 1,
   * letter : 'm',
   * status : 'present' | 'correct' | 'absent',
   */
  filterLetter ( filter ) {
    if ( filter.status === 'correct' ) {
      this.words = this.words.filter( ( word ) => word[filter.order - 1] === filter.letter );
    } else if ( filter.status === 'present' ) {
      this.words = this.words.filter( ( word ) => {
        const indexOfLetter = word.indexOf( filter.letter );
        if ( indexOfLetter > -1 && indexOfLetter !== ( filter.order - 1 ) ) return true;

        return false;
      } );
    } else if ( filter.status === 'absent' ) {
      this.words = this.words.filter( ( word ) => word.indexOf( filter.letter ) === -1 );
    }
  }
}

module.exports = WordAlgorithm;
