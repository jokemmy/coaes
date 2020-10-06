
import fs from 'fs';
import dotenv from 'dotenv';


// 初始化env
const envConfig = dotenv.parse( fs.readFileSync( '../.env' ));
for ( const key in envConfig ) {
  process.env[key] = envConfig[key];
}

// 加载项目.env文件
const result = dotenv.config()
if ( result.error ) {
  throw result.error
}

if ( process.env.NODE_ENV === 'production' ) {
  process.env.COAES_DEBUG = false;
}
