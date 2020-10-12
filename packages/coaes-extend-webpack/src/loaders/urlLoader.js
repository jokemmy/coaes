
export default ( options ) => {
  return {
    exclude: [
      /\.html$/,
      /\.jsx?$/,
      /\.tsx?$/
      /\.json$/,
      /\.svg$/,
      /\.(css|less|scss)$/
    ],
    use: [{
      loader: "url-loader",
      options: {
        limit: 8888,
        ...options
      }
    }]
  };
};


// {
//   // Conditions:
//   test: /\\.jsx?$/,
//   include: [
//     path.resolve(__dirname, "app")
//   ],
//   exclude: [
//     path.resolve(__dirname, "app/demo-files")
//   ],
//   // these are matching conditions, each accepting a regular expression or string
//   // test and include have the same behavior, both must be matched
//   // exclude must not be matched (takes preferrence over test and include)
//   // Best practices:
//   // - Use RegExp only in test and for filename matching
//   // - Use arrays of absolute paths in include and exclude to match the full path
//   // - Try to avoid exclude and prefer include
//   // Each condition can also receive an object with "and", "or" or "not" properties
//   // which are an array of conditions.
//   issuer: /\\.css$/,
//   issuer: path.resolve(__dirname, "app"),
//   issuer: { and: [ /\\.css$/, path.resolve(__dirname, "app") ] },
//   issuer: { or: [ /\\.css$/, path.resolve(__dirname, "app") ] },
//   issuer: { not: [ /\\.css$/ ] },
//   issuer: [ /\\.css$/, path.resolve(__dirname, "app") ], // like "or"
//   // conditions for the issuer (the origin of the import)
//   /* Advanced conditions (click to show) */

//   // Actions:
//   loader: "babel-loader",
//   // the loader which should be applied, it'll be resolved relative to the context
//   options: {
//     presets: ["es2015"]
//   },
//   // options for the loader
//   use: [
//     // apply multiple loaders and options instead
//     "htmllint-loader",
//     {
//       loader: "html-loader",
//       options: {
//         // ...
//       }
//     }
//   ]
//   type: "javascript/auto",
//   // specifies the module type
//   /* Advanced actions (click to show) */
// }