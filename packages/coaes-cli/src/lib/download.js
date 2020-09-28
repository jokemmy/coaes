'use strict';

const https = require( 'https' );
const ProgressBar = require( 'progress' );


const codeMessage = ( statusCode ) => {

  const messages = {
    // 200: '服务器成功返回请求的数据。',
    // 201: '新建或修改数据成功。',
    // 202: '一个请求已经进入后台排队（异步任务）。',
    // 204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。',
  };

  if ( messages[statusCode]) {
    return `[${statusCode}]${messages[statusCode]}`;
  }
  return `[${statusCode}]下载失败。`;
};

function get( downloadUrl, resolve, reject ) {

  https.get( downloadUrl, ( res ) => {

    // 处理 301 302
    if ( res.headers.location ) {
      return get( res.headers.location, resolve, reject );
    }

    // 返回正确
    if ( res.statusCode >= 200 && res.statusCode < 300 )  {

      const chunks = [];
      const length = parseInt( res.headers['content-length'], 10 );

      // 创建下载进度跳 '下载脚手架 [:bar] :rate/bps :percent :etas'
      const bar = new ProgressBar( 'Downloading [:bar] :percent', {
        // clear: true,
        complete: '#',
        incomplete: '.',
        width: 100,
        total: length
      });

      res.on( 'data', function( chunk ) {
        bar.tick( chunk.length );
        chunks.push( chunk );
      });

      res.on( 'end', function () {
        try {
          resolve( Buffer.concat( chunks, length ));
        } catch ( err ) {
          reject( err );
        }
      });
    } else {
      // 下载出错
      reject( codeMessage( res.statusCode ));
    }
  });
}

module.exports = async function download( downloadUrl ) {
  return new Promise(( resolve, reject ) => get( downloadUrl, resolve, reject ) );
};
