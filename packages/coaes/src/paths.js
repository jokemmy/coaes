
import path from 'path';


export default ({ root, build }) => {
  return {
    appSrc: path.join( root, './src' ),
    appBuild: path.join( root, build ),
    appNodeModules: path.join( root, './node_modules' )
  };
}
