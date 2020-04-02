// webpack4.x
const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  // mode: 'production',
  mode: 'development',
  plugins: [
    // new UglifyJsPlugin({
    //   uglifyOptions: {
    //     ecma: 8,
    //     warnings: false,
    //     parse: {},
    //     compress: {},
    //     mangle: {
    //       properties: {
    //         // mangle property options
    //       }
    //     },
    //     output: {
    //       comments: false,
    //       beautify: false
    //     },
    //     toplevel: false,
    //     nameCache: null,
    //     ie8: false,
    //     keep_classnames: undefined,
    //     keep_fnames: false,
    //     safari10: false,
    //   }
    // })
  ],
  optimization: {
    minimize: true,
    // splitChunks: {
    //   chunks: 'all',
    //   name: 'common',
    // },
    // runtimeChunk: {
    //   name: 'runtime',
    // }
  },
  devtool: false,
  // devtool: 'eval-source-map',
  entry: {
    index: ['./src/index.js']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].min.js',
    // libraryTarget: 'var',
    // libraryTarget: "commonjs",
    libraryTarget: "umd",
    // libraryTarget: "amd",
    // libraryExport: "default",
    // umdNamedDefine: true,
    // 导出变量名为
    library: 'ArmRoot'
      // library: {
      //   root: '[name]',
      //   amd: '[name]',
      //   commonjs: '[name]'
      // },
  },
  module: {
    rules: [
      // {
      //   test: /\.(png|jpg|gif|svg)$/,
      //   loader: 'file-loader',
      //   options: {
      //     name: '[name].[ext]?[hash]'
      //   }
      // },
      // {
      //   test: /(\.jsx|\.js)$/,
      //   loader: "eslint-loader",
      //   exclude: /node_modules/
      // },
      {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            ["@babel/preset-env", {
            // ["env", {
              "targets": {
                "chrome": "56",
                "ie": "10",
                "edge": "13",
                "firefox": "45"
              },
              // "modules": false
            }]
          ]
        }

        // presets: [
          // ["es2015", {
          //   "modules": false
          // }],
          // 'es2015',
          // '@babel/preset-env'
        // ]

      }
    }]
  }
};
