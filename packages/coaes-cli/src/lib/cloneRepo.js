'use strict';

const decompress = require( 'decompress' );
const download = require( './download' );
const { log } = require( './utils' );


module.exports = async function( dir ) {
  const downloadUrl = 'https://github.com/jokemmy/coaes-sample-react/archive/master.zip';
  const stream = await download( downloadUrl );
  log( 'Extracting...' );
  await decompress( stream, dir, {
    strip: 1
    // filter: file => path.extname (file.path ) !== '.exe'
  });
};





  // request( downloadUrl );
  // const req = https.get( downloadUrl, ( res ) => {
  //   log('状态码:', res.statusCode);
  //   console.log('请求头:', res.headers);
  //   log(1)
  //   const chunks = [];
  //   const length = parseInt( res.headers['content-length'], 10);

  //   log(2);
  //   var bar = new ProgressBar('  downloading [:bar] :rate/bps :percent :etas', {
  //     complete: '=',
  //     incomplete: ' ',
  //     width: 20,
  //     total: length
  //   });
  //   log(length)

  //   res.on( 'data', function( chunk ) {log(3)
  //     bar.tick( chunk.length );
  //     chunks.push( chunk );
  //   });

  //   res.on( 'end', function () {log(4)
  //     decompress( Buffer.concat( chunks, length ), dirPath, {
  //       strip: 1,
  //       // filter: file => path.extname (file.path ) !== '.exe'
  //     }).then( files => {
  //       log( 'done!', files );
  //     });
  //   });
  // });

  // // req.on( 'response', function( res ) {


  // // });

  // req.end();



  // let length = 0;
  // const chunks = [];
  // const stream = got.stream( downloadUrl );

  // stream.on( 'response', ( res ) => {
  //   length = parseInt( res.headers['content-length'], 10 );
  // });

  // stream.on( 'data', chunk => {
  //   chunks.push( chunk );
  // });

  // stream.on( 'end', () => {
  //   decompress( Buffer.concat( chunks, length ), dirPath, {
  //     strip: 1,
  //     // filter: file => path.extname (file.path ) !== '.exe'
  //   }).then( files => {
  //     log( 'done!', files );
  //   });
  // });

  // stream.on( 'error', ( error ) => {
  //   error( error.toString());
  // });


