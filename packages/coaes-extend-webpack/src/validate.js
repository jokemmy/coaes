
import path from 'path';
import is from 'whatitis';
import invariant from 'invariant';


export default function( config ) {

  invariant(
    config.root && is.String( config.root ) && path.isAbsolute( config.root ),
    'config.root 的值不合法'
  );

  invariant(
    is.oneOf([ 'none', 'hash', 'chunkHash', 'contentHash' ])( config.hash ),
    'config.hash 的值不合法'
  );

}
