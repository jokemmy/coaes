
import merge from './config/merge';
import load from './config/load';
import configDefault from './config/config.default';


export default function({ configFile, root }) {

  const config = merge( configDefault, load( configFile ));

  if ( root ) {
    config.root = root;
  }

  return config;
}

