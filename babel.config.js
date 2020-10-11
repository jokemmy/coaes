
module.exports = {
  babelrcRoots: [ ".", "packages/*" ],
  presets: [
    [ "@babel/env", {
      corejs: {
        version: 3,
        proposals: true
      },
      // corejs: 2,
      useBuiltIns: "usage",
      targets: {
        node: 7
      }
    }]
  ],
  plugins: [
    // Stage 0
    "@babel/proposal-function-bind",

    // Stage 1
    "@babel/proposal-export-default-from",
    "@babel/proposal-logical-assignment-operators",
    ["@babel/proposal-optional-chaining", { loose: false }],
    ["@babel/proposal-pipeline-operator", { proposal: "minimal" }],
    ["@babel/proposal-nullish-coalescing-operator", { loose: false }],
    "@babel/proposal-do-expressions",

    // Stage 2
    ["@babel/proposal-decorators", { legacy: true }],
    "@babel/proposal-function-sent",
    "@babel/proposal-export-namespace-from",
    "@babel/proposal-numeric-separator",
    "@babel/proposal-throw-expressions",

    // Stage 3
    "@babel/syntax-dynamic-import",
    "@babel/syntax-import-meta",
    ["@babel/proposal-class-properties", { loose: false }],
    "@babel/proposal-json-strings",
    "@babel/transform-async-to-generator"
  ],
  env: {
    commonjs: {
      plugins: [
        ["@babel/transform-modules-commonjs", { lazy: true }],
        "@babel/transform-runtime"
      ]
    }
  }
};
