
import is from 'whatitis';
import invariant from 'invariant';


/**
 *
 * // indexTemplate: '',
 * // mountElementId: 'root'
 * manifest: true,
 * // history: 'browser'
 *
 */

export default function( config ) {

  invariant(
    is.Undefined( config.manifest ) || is.PlainObject( config.manifest ),
    'config.manifest 的值不合法'
  );

}
