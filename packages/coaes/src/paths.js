
import path from 'path';


export default ({ cwd, build }) => {

  return {
    appBuild: path.join( cwd, build )
  };
}
