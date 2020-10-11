
import validate from './validate';
import load from './config/load';
import merge from './config/merge';
import configDefault from './config/config.default';


function combine( config, binArgs ) {
  if ( binArgs.root ) {
    config.root = binArgs.root;
  }
}

export default function( binArgs ) {

  let config = {};

  if ( binArgs.config ) {
    config = load( binArgs.config );
  }

  combine( config, binArgs );
  merge( configDefault, config );
  validate( config );

  return config;
}
