
export const loadModule = function( target ) {
  let subModule = null;
  const prefix = 'coaes-engine-';
  const moduleNames =  [ target, prefix + target ];
  const requireTarget = function() {
    try {
      subModule = require( moduleNames.pop());
    } catch() {
      if ( moduleNames.length > 0 ) {
        requireTarget();
      }
    }
  }
  requireTarget();
  return subModule;
}
