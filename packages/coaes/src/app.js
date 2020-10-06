
import merge from './config/merge';
import loadConfig from './config/load';
import defaultConfig from './config/default.json';


/**
 *
 * @param { configFile } binArgs
 *
 * coaes --configFile ./coaes.config.js
 */
export default function App( binArgs ) {

  const { configFile } = binArgs;
  const config = merge( defaultConfig, loadConfig( configFile ));
console.log(binArgs);
  /**
   * alias
   */
  return {

  };
};
