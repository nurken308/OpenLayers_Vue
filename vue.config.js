const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.geojson$/,
          type: 'javascript/auto',
          loader: 'json-loader'
        }
      ]
    }
  }
});
