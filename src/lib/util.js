const exitProcess = ( code ) => {
  setTimeout( () => {
    process.exit( code || 0 );
  }, 5000 );
};

module.exports = { exitProcess };
