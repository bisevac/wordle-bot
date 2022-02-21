module.exports = ( word, tryWord ) => {
  const stageStatus = [];

  for ( let i = 1; i <= tryWord.length; i += 1 ) {
    const tryLetter = tryWord[i - 1];
    const indexOf = word.indexOf( tryLetter );
    let status = 'absent';

    if ( indexOf === i - 1 ) {
      status = 'correct';
    } else if ( indexOf > -1 ) {
      status = 'present';
    }

    stageStatus.push( {
      order  : i,
      letter : tryLetter,
      status,
    } );
  }

  return stageStatus;
};
