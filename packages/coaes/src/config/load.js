
import fs from 'fs';
import path from 'path';
import JSON5 from 'json5';
// import merge from './merge';
// import defaultCfg from './default.json';


const converters = [{
  test: /^\.coaesrc$|\.json$/,
  loader: function( filePath ) {
    return JSON5.parse( fs.readFileSync( filePath ));
  }
}, {
  test: /\.js$/,
  loader: function( filePath ) {
    return require( filePath );
  }
}];

function readCfg( cfgPath ) {
  const fileName = path.basename( cfgPath );
  const converter = converters.find(({ test }) => test.test( fileName ));
  if ( converter ) {
    return converter.loader( cfgPath );
  }
  return {};
}

export default function( cfgPath ) {
  if ( fs.existsSync( cfgPath )) {
    return readCfg( cfgPath );
  }
  return {};
};
