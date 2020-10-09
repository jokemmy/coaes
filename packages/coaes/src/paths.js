
import path from 'path';


export default ({ cwd, build }) => {
  return {
    appSrc: path.join( cwd, './src' ),
    appBuild: path.join( cwd, build ),
    appNodeModules: path.join( cwd, './node_modules' )
  };
}
