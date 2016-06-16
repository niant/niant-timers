var webpack = require('webpack')
var path = require('path')

module.exports =
{ entry: './js'
, devtool: process.env.PROD ? 'source-map' : 'eval-source-map'
, output:
  { path: path.resolve( '.' )
  , filename: 'build.js'
  , publicPath: ''
  }
, resolve:
  { root: path.resolve( 'js' )
  , extensions: [ '', '.webpack.js', '.web.js', '.js' ]
  }
, plugins: process.env.PROD
    ? [ new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"production"' })
      , new webpack.optimize.OccurenceOrderPlugin()
      , new webpack.optimize.UglifyJsPlugin({ compressor: { warnings: false }})
      ]
    : [ new webpack.DefinePlugin({ DEBUG: true })
      , new webpack.HotModuleReplacementPlugin()
      , new webpack.NoErrorsPlugin()
      ]
, module:
  { loaders:
    [ { test: /\.js$/
      , exclude: /node_modules/
      , loader: 'babel'
      }
    ]
  }
}
