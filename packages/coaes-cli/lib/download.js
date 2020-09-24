'use strict';

const got = require( 'got' );
const path = require( 'path' );
const stream = require( 'stream' );
const https = require( 'https' );
const request = require( 'request' );
const decompress = require( 'decompress' );
const { promisify } = require( 'util' );

const pipeline = promisify( stream.pipeline );


module.exports = async ( dir ) => {

  const downloadUrl = 'https://github.com/jokemmy/coaes-sample-react/archive/master.zip';

  try {
    // const repoStream = got.stream( downloadUrl );
    // const bufferStream = new stream.PassThrough({ objectMode: false });
    // await pipeline( repoStream, bufferStream );
    // console.log(bufferStream);
    const chunks = [];
    let length = 0;
    // bufferStream.on( 'data', chunk => {
    //   // console.log(bufferStream, chunk);
    //   chunks.push( chunk );
    //   length += chunk.length;
    // });
    // bufferStream.on( 'end', () => {
    //   const data = Buffer.concat( chunks, length );
    //   decompress( data, dir + '/dist', {
    //     strip: 1,
    //     filter: file => path.extname(file.path) !== '.exe'
    //   }).then( files => {
    //     console.log('done!', files);
    //   });
    // });

    https.get( downloadUrl, ( res ) => {

      req.on( 'response', ( data ) => {
        const totalBytes = parseInt( data.headers['content-length'], 10 );
        console.log( 'totalBytes', totalBytes );
      });

      res.on( 'data', ( chunk ) => {
        chunks.push( chunk );
        length += chunk.length;
      });

      res.on( 'end',()=>{
        const data = Buffer.concat( chunks, length );
        decompress( data, dir + '/dist', {
          strip: 1,
          filter: file => path.extname(file.path) !== '.exe'
        }).then( files => {
          console.log('done!', files);
        });
      })
    });

    // const req = request({
    //   method: 'GET',
    //   uri: downloadUrl
    // });

    // req.pipe( bufferStream );

    // let totalBytes = 0;
    // let receivedBytes = 0;

    // req.on( 'response', ( data ) => {
    //   totalBytes = parseInt( data.headers['content-length'], 10 );
    //   console.log( 'totalBytes', totalBytes );
    // });

    // req.on( 'data', ( chunk ) => {
    //   receivedBytes += chunk.length;
    //   console.log( 'receivedBytes', receivedBytes );
    //   // this.showProgress( receivedBytes, totalBytes );
    // });

    // req.on( 'end', () => {
    //   console.log('下载已完成，等待处理');
    //   const data = Buffer.concat( chunks, length );
    //   decompress( data, dir + '/dist', {
    //     strip: 1,
    //     filter: file => path.extname(file.path) !== '.exe'
    //   }).then( files => {
    //     console.log('done!', files);
    //   });
    //   // // TODO: 检查文件，部署文件，删除文件
    //   // this.downloadCallback('finished', percentage);
    // });
    // stream.on( 'pipe', ( data ) => {
    //   console.log(1,data);
    // });
    // stream.on( 'finish', ( data ) => {
    //   console.log(2,data);
    //   // decompress( data, 'dist', {
    //   //   filter: file => path.extname(file.path) !== '.exe'
    //   // }).then( files => {
    //   //   console.log('done!');
    //   // });
    // });
  } catch ( error ) {
    console.log( error );
  }
};
