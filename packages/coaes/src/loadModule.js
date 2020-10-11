
const loadModule = ( prefix ) => {
  return function( target ) {
    let subModule = null;
    const moduleNames =  [ target, prefix + target ];
    const requireTarget = function() {
      try {
        subModule = require( moduleNames.pop());
      } catch( e ) {
        if ( moduleNames.length > 0 ) {
          requireTarget();
        }
      }
    }
    requireTarget();
    return subModule;
  }
}

export const loadExtend = loadModule( 'coaes-extend-' );
export const loadEngine = loadModule( 'coaes-engine-' );
export const loadPlugin = loadModule( 'coaes-plugin-' );
