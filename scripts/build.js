
const fs = require( 'fs' );
const path = require( 'path' );
const glob = require( 'glob' );
const { transformFileSync } = require( '@babel/core' );


const root = process.cwd();
const packages = [{
  dirname: 'coaes-cli',
  babelOptions: {
    envName: 'commonjs',
    rootMode: 'upward'
  },
  transform: [
    { input: 'src/lib', output: 'lib' },
    { input: 'src/bin', output: 'bin' }
  ]
}];

// 1 input dir, output dir
// 2 input file, output dir
// 3 input file, output file
packages.forEach(( package ) => {
  const packageRoot = path.join( root, 'packages', package.dirname );
  package.transform.forEach(({ input, output, test }) => {
    const inputPath = path.join( packageRoot, input );
    const outputPath = path.join( packageRoot, output );
    if ( !fs.existsSync( inputPath )) {
      console.error( `[error] ${inputPath} 文件不存在` );
      process.exit(1);
    } else if ( fs.lstatSync( inputPath ).isDirectory()) {
      const files = glob.sync( path.join( inputPath, test || '**/*.js' ), { cwd: packageRoot });
      files.forEach(( filePath ) => {
        const relativeFilePath = path.relative( inputPath, filePath );
        const outputFilePath = path.join( outputPath, relativeFilePath );
        const outputDirPath =  path.dirname( outputFilePath );
        const { code } = transformFileSync( filePath, package.babelOptions );
        if ( !fs.existsSync( outputDirPath )) {
          fs.mkdirSync( outputDirPath, { recursive: true });
        }
        fs.writeFileSync( outputFilePath, code, 'utf8' );
      });
    } else if ( fs.lstatSync( inputPath ).isFile()) {
      const { code } = transformFileSync( inputPath, package.babelOptions );
      if ( !fs.existsSync( outputPath )) {
        if ( !/^.+\..+$/.test( path.basename( outputPath ))) {
          fs.mkdirSync( outputPath, { recursive: true });
          fs.writeFileSync( path.join( outputPath, path.basename( inputPath )), code, 'utf8' );
        } else {
          const outputDirPath =  path.dirname( outputPath );
          if ( !fs.existsSync( outputDirPath )) {
            fs.mkdirSync( outputDirPath, { recursive: true });
          }
          fs.writeFileSync( outputPath, code, 'utf8' );
        }
      } else if ( fs.lstatSync( outputPath ).isDirectory()) {
        fs.writeFileSync( path.join( outputPath, path.basename( inputPath )), code, 'utf8' );
      } else {
        fs.writeFileSync( outputPath, code, 'utf8' );
      }
    }
  });
});
