const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    // plugin that 'builds' the html file
    plugins: [
      new HtmlWebpackPlugin({
        template: "./index.html",
        title: "text-editor",
      }),
      // tells the code to use the service worker from the designated js file
      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "src-sw.js",
      }),
      // generates the manifest file required
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'PWA persistant text editor',
        short_name: 'PTE',
        description: 'A persistant Text editor',
        background_color: '#225ca3',
        theme_color: '#225ca3',
        start_url: './',
        publicPath: './',
        icons: [
  // designates the path for the logo image
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
    ],

    module: {
      rules: [
        // instructs the loader which files to use when compiling the css
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        // instructs the loader which files to use when compiling the javascript
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          // We use babel-loader in order to use ES6.
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};
