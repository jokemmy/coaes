

export default function( config, { paths }) {

  const prevFileSize = getFileSize( paths.appBuild );

  fs.emptyDirSync( appBuild );

  const compiler = webpack( configWebpack );

  compiler.run(( err, stats ) => {
    if ( err ) {
      error( 'Failed to compile.' );
      throw err;
    }

    if ( stats.compilation.errors.length ) {
      error( 'Failed to compile.' );
      throw stats.compilation.errors;
    }

    info( 'Compiled successfully.' );
    print( 'File sizes after gzip:' );
    printFileSizes( stats, prevSizeMap );
    print();

    if ( argv.analyze ) {
      print( `Analyze result is generated at ${chalk.cyan( 'dist/stats.html' )}.` );
    }

    resolve();
  });
}
