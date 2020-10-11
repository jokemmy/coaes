
import path from 'path';
import is from 'whatitis';
import invariant from 'invariant';


export default function( config ) {

  invariant(
    config.root && is.String( config.root ) && path.isAbsolute( config.root ),
    'config.root 的值不合法'
  );

  invariant(
    config.basename && is.String( config.basename ),
    'config.basename 的值不合法'
  );

  invariant(
    config.build && is.String( config.build ),
    'config.build 的值不合法'
  );

  invariant(
    config.hash && is.oneOf([ 'none', 'hash', 'chunkHash', 'contentHash' ])( config.hash ),
    'config.hash 的值不合法'
  );

  invariant(
    config.extend && is.String( config.extend ),
    'config.extend 的值不合法'
  );

  invariant(
    config.engine && is.String( config.engine ),
    'config.extend 的值不合法'
  );

  invariant(
    is.Array( config.plugins ),
    'config.extend 的值不合法'
  );

}
