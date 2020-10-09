
import glob from 'glob';
import chalk from 'chalk';
import fs from 'fs-extra';
import filesize from 'filesize';
import stripAnsi from 'strip-ansi';
import { sync as gzipSize } from 'gzip-size';
import { log } from '../../coaes/src/logger';


function removeFileNameHash( fileName ) {
  return path.basename( fileName ).replace( /\/?(.*)(\.\w+)(\.js|\.css)/, ( match_, p1, p2_, p3 ) => p1 + p3 );
}

// Input: 1024, 2048
// Output: "(+1 KB)"
function getDifferenceLabel( currSize, prevSize ) {
  const FIFTY_KILOBYTES = 1024 * 50;
  const difference = currSize - prevSize;
  const fileSize = !Number.isNaN( difference ) ? filesize( difference ) : 0;
  if ( difference >= FIFTY_KILOBYTES ) {
    return chalk.red( `+${fileSize}` );
  } else if ( difference < FIFTY_KILOBYTES && difference > 0 ) {
    return chalk.yellow( `+${fileSize}` );
  } else if ( difference < 0 ) {
    return chalk.green( fileSize );
  }
  return '';
}

export const getFileSize = function( appBuild ) {
  const files = glob.sync( path.join( appBuild, '**/*.(js|css)' ));
  return files
    .reduce(( sizeMap, fileName ) => {
      const contents = fs.readFileSync( fileName );
      const nameWithoutHash = removeFileNameHash( fileName );
      sizeMap[nameWithoutHash] = gzipSize( contents );
      return sizeMap;
    }, {});
};

export default function({ paths }) {


  function printFileSizes( stats, prevSizeMap ) {
    const assets = stats.toJson().assets
      .filter( asset => /\.(js|css)$/.test( asset.name ))
      .map(( asset ) => {
        const fileContents = fs.readFileSync( path.join( appBuild, asset.name ));
        const currSize = gzipSize( fileContents );
        const prevSize = prevSizeMap[removeFileNameHash( asset.name )];
        const difference = getDifferenceLabel( currSize, prevSize );
        return {
          folder: path.join( outputPath, path.dirname( asset.name )),
          name: path.basename( asset.name ),
          size,
          sizeLabel: filesize( size ) + ( difference ? ` (${difference})` : '' )
        };
      });
    assets.sort(( a, b ) => b.size - a.size );
    const longestSizeLabelLength = Math.max.apply(
      null,
      assets.map( a => stripAnsi( a.sizeLabel ).length ),
    );
    assets.forEach(( asset ) => {
      let sizeLabel = asset.sizeLabel;
      const sizeLength = stripAnsi( sizeLabel ).length;
      if ( sizeLength < longestSizeLabelLength ) {
        const rightPadding = ' '.repeat( longestSizeLabelLength - sizeLength );
        sizeLabel += rightPadding;
      }
      log(
        `  ${sizeLabel}  ${chalk.dim( asset.folder + path.sep )}${chalk.cyan( asset.name )}`,
      );
      log();
    });
  }
}
