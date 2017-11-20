const GitRevisionPlugin = require('git-revision-webpack-plugin')
const gitRevisionPlugin = new GitRevisionPlugin()

const path = require('path')

module.exports = {
  entry: [
    path.join(process.cwd(), 'app/app.js'),
  ],
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].chunk.js',
    path: path.resolve(process.cwd(), 'build'),
    publicPath: '/',
  },
  resolve: {
    alias: {
      xyz: './whoami.txt',
    },
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      }, {
        test: /version$/,
        loaders: [
          {
            loader: 'file-loader',
            options: {
              name: 'version.json',
            },
          },
          {
            loader: 'text-transform-loader',
            options: {
              appendText: JSON.stringify({
                version: gitRevisionPlugin.version(),
                hash: gitRevisionPlugin.commithash(),
                branch: gitRevisionPlugin.branch(),
              }),
            },
          },
        ],
      },
    ]
  }
}

/*
module.exports = {
  plugins: [
    new DefinePlugin({
      'VERSION': JSON.stringify(gitRevisionPlugin.version()),
      'COMMITHASH': JSON.stringify(gitRevisionPlugin.commithash()),
      'BRANCH': JSON.stringify(gitRevisionPlugin.branch()),
    })
  ]
}
*/
