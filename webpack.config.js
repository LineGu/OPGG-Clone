const webpack = require('webpack');
const path = require('path');

const prod = process.env.NODE_ENV === 'production';

module.exports = {
  mode: prod ? 'production' : 'development',
  devtool: prod ? 'hidden-source-map' : 'eval',

  entry: './src/client/index.tsx',

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@types': path.resolve(__dirname, 'src/client/types/index.ts'),
      '@components': path.resolve(__dirname, 'src/client/components'),
      '@constants': path.resolve(__dirname, 'src/client/constants'),
      '@hooks': path.resolve(__dirname, 'src/client/hooks'),
      '@api': path.resolve(__dirname, 'src/common/api'),
      '@models': path.resolve(__dirname, 'src/client/models'),
      '@layouts': path.resolve(__dirname, 'src/client/layouts'),
      '@utils': path.resolve(__dirname, 'src/common/utils'),
      '@containers': path.resolve(__dirname, 'src/client/containers'),
      '@page': path.resolve(__dirname, 'src/client/page'),
    },
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        include: [
          path.resolve('./src/client'),
          path.resolve('./src/common'),
          path.resolve('node_modules/'),
        ],
        exclude: [/node_modules[\\/]core-js/, /node_modules[\\/]webpack[\\/]buildin/],
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: true,
            },
          },
        ],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
    ],
  },

  output: {
    path: path.join(__dirname, './dist/client'),
    filename: 'bundle.js',
    sourceMapFilename: '[name].js.map',
  },

  plugins: [
    new webpack.ProvidePlugin({
      React: 'react',
    }),
  ],
  devServer: {
    port: 3000,
    static: [
      {
        directory: path.resolve(__dirname, './public'),
      },
    ],
    historyApiFallback: true,
    hot: true,
  },
};
