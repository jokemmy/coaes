
import decompress from 'decompress';
import download from './download';
import { log } from './utils';


export default async function cloneRepo( dir ) {
  const downloadUrl = 'https://github.com/jokemmy/coaes-sample-react/archive/master.zip';
  const stream = await download( downloadUrl );
  log( 'Extracting...' );
  await decompress( stream, dir, {
    strip: 1
    // filter: file => path.extname (file.path ) !== '.exe'
  });
};
