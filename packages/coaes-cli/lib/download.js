'use strict';

const got = require( 'got' );
const path = require( 'path' );
const decompress = require( 'decompress' );
const { warning, error, info, log, readDir } = require( './utils' );


module.exports = ( dir ) => {

  const downloadUrl = 'https://github.com/jokemmy/coaes-sample-react/archive/master2.zip';
  const dirPath = path.join( dir, '/dist' );

  const files = readDir( dirPath );
  if ( files.length > 0 ) {
    log();
    log( dirPath )
    error( '文件夹中已经存在文件' )
    log();
    process.exit(0);
  }


  let length = 0;
  const chunks = [];
  const stream = got.stream( downloadUrl );

  stream.on( 'response', ( res ) => {
    length = parseInt( res.headers['content-length'], 10 );
  });

  stream.on( 'data', chunk => {
    chunks.push( chunk );
  });

  stream.on( 'end', () => {
    decompress( Buffer.concat( chunks, length ), dirPath, {
      strip: 1,
      // filter: file => path.extname (file.path ) !== '.exe'
    }).then( files => {
      log( 'done!', files );
    });
  });

  stream.on( 'error', ( error ) => {
    error( error.toString());
  });

};
