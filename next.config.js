// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

const { withSentryConfig } = require('@sentry/nextjs');

const moduleExports = {
  // Your existing module.exports
  trailingSlash: true,
    devIndicators: {
        autoPrerender: false
    },
    env: {
        AUTH_TOKEN_C: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ5MzYwODYyLCJleHAiOjE2NTE5NTI4NjJ9.DU3ax_8mGbJ7uhUDZPAym7TDs6330g4mcx3JlU0qhoc',
        graphqlEndPoint:'http://localhost:1337'
      },
    webpack: (config, { webpack, isServer }) => {
        // Tell webpack to ignore watching content files in the content folder.
        // Otherwise webpack receompiles the app and refreshes the whole page.
        // Instead, the src/pages/[...slug].js uses the "withRemoteDataUpdates"
        // function to update the content on the page without refreshing the
        // whole page
        if (!isServer) {
          config.node = {
            fs: 'empty'
          }
        }
        config.plugins.push(new webpack.WatchIgnorePlugin([[/\/content\//]]));
        return config;
    },
};

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);
