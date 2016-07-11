const webpack       = require('webpack')
const chalk         = require('chalk')
const _debug        = require('debug')


module.exports = function (webpackCfg) {
  const debug = _debug('app:bin:compile')

  debug(`Environment is set to: ${process.env.NODE_ENV || 'default'}`)
  debug('Webpack compiler starting to build')

  const compiler = webpack(webpackCfg)

  compiler.run((err, stats) => {
    const jsonStats = stats.toJson()

    debug('Compilation completed!')
    console.log(stats.toString({
      colors: true,
      children: false,
      chunks: false
    }))

    if (err) {
      debug(chalk.red(err))
      process.exit(1)
    } else if (jsonStats.errors.length > 0) {
      debug(chalk.red(jsonStats.errors))
      process.exit(1)
    } else if (jsonStats.warnings.length > 0) {
      // debug(chalk.yellow(jsonStats.warnings))
    }

    debug('All done - everything is good to go.')
  })
}