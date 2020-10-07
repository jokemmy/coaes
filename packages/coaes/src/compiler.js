

export default function( config, { paths }) {

  const files = glob.sync( path.join( paths.appBuild, '**/*' ), { cwd: config.root });
  const prevSizeMap = files
      .filter( fileName => /\.(js|css)$/.test( fileName ))
      .reduce(( sizeMap, fileName ) => {
        const contents = fs.readFileSync( fileName );
        const nameWithoutHash = removeFileNameHash( fileName.replace( paths.appBuild, '' ));
        sizeMap[nameWithoutHash] = gzipSize( contents );
        return sizeMap;
      }, {});

}

  const files = glob.sync( path.join( paths.appBuild, '**/*' ), { cwd: config.root });
  const prevSizeMap = files
      .filter( fileName => /\.(js|css)$/.test( fileName ))
      .reduce(( sizeMap, fileName ) => {
        const contents = fs.readFileSync( fileName );
        const nameWithoutHash = removeFileNameHash( fileName.replace( paths.appBuild, '' ));
        sizeMap[nameWithoutHash] = gzipSize( contents );
        return sizeMap;
      }, {});

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