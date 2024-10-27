const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin")
const path = require('path');

module.exports = (env) => ({
  entry: '/src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'main.[contenthash].js',
    clean: true,
  },
  optimization: {
    minimizer: [
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.sharpMinify,
          options: {
            encodeOptions: {
              jpeg: {
                quality: 60,
              },
              jpg: {
                quality: 60,
              },
              webp: {
                lossless: true,
              },
              avif: {
                lossless: true,
              },
              png: {
                quality: 60,
              },
              gif: {},
            },
          },
        },
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            targets: "defaults",
            presets: [
              ['@babel/preset-env']
            ]
          }
        }
      },
      {
        test: /\.(jpeg|jpg|png|svg|ttf)$/i,
        type: "asset/resource",
      },

      {
        test: /\.scss$/i,
        use: [
          // Creates `style` nodes from JS strings
          env.prod ? MiniCssExtractPlugin.loader : "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Форма оплаты",
      favicon: 'src/assets/img/favicon.svg'
    }),
    new MiniCssExtractPlugin({
      filename: 'main.[contenthash].css',
    })
  ],
  devServer: {
    historyApiFallback: true,
    hot: true,
  }
});
