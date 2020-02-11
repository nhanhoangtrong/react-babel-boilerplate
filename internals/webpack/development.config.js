const baseConfig = require('./base.config.js');
const developmentConfig = Object.assign({}, baseConfig, {
    resolve: Object.assign({}, baseConfig.resolve, {
        alias: {
            '@src': baseConfig.resolve.alias['@src'],
            'react-dom': '@hot-loader/react-dom',
        },
    }),
});

module.exports = developmentConfig;
