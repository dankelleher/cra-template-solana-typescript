const { ProvidePlugin } = require('webpack');

module.exports = function (config, env) {
  return {
    ...config,
    module: {
      ...config.module,
      rules: [
        ...config.module.rules,
        {
          test: /\.(m?js|ts)$/,
          enforce: 'pre',
          use: ['source-map-loader'],
        },
      ],
    },
    plugins: [
      ...config.plugins,
      new ProvidePlugin({
        process: 'process/browser',
      }),
      new ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
      }),
    ],
    resolve: {
      ...config.resolve,
      fallback: {
        assert: require.resolve('assert'),
        buffer: require.resolve('buffer'),
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        stream: require.resolve('stream-browserify'),
        crypto: require.resolve('crypto-browserify'),
        zlib: require.resolve("browserify-zlib")
      },
    },
    ignoreWarnings: [/Failed to parse source map/],
  };
};
