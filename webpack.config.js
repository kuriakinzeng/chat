const Dotenv = require('dotenv-webpack')

module.exports = {
  entry: {
    app: './app.js'
  },
  output: {
    filename: 'build.js'
  },
  resolve: {
    alias: {
      'vue': 'vue/dist/vue.min.js',
    }
  },
  plugins: [
    new Dotenv()
  ]
}
