const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  name: 'server',
  entry: {
    server: path.resolve(__dirname, 'src/server/server.tsx'),
  },
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist/server'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
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
  target: 'node',
  externals: [nodeExternals()],
  node: {
    __dirname: true,
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        include: [path.resolve('./src/'), path.resolve('node_modules/')],
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
};
