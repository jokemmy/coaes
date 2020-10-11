
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';


// 初始化env
const envConfig = dotenv.parse( fs.readFileSync( path.join( __dirname, '../.env' )));
for ( const key in envConfig ) {
  process.env[key] = envConfig[key];
}

// 加载项目.env文件
dotenv.config();


process.env.NODE_ENV = process.env.NODE_ENV || 'production';
if ( process.env.NODE_ENV === 'production' ) {
  process.env.COAES_DEBUG = false;
}
