

export default function merge( configA, configB ) {

  const aKeys = Object.keys( configA );
  const bKeys = Object.keys( configB );

  aKeys.forEach(( key ) => {
    if ( is.oneOf( bKeys )( key ) && !configB[key]) {
      delete configB[key];
    }
  });

  return Object.assign( configA, configB );
}
