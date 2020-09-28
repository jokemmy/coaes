
const spawn = require( 'cross-spawn' );


let installedPm = '';
module.exports = function() {

  if ( installedPm ) {
    return installedPm;
  }

  const pm = [ 'yarn', 'npm' ];
  for ( let i = 0, l = pm.length; i < l; i++ ) {
    const result = spawn.sync(
      pm[i],
      ['-v'],
      { stdio: null }
    );
    if ( !result.error ) {
      installedPm = pm[i];
      break;
    }
  }
  return installedPm || 'npm';
};
