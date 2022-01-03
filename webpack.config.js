const webpackTerser = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path          = require('path');
const glob          = require('glob');

const devFlag = false;

const mode = () => {
    return devFlag ? 'development' : 'production';
};
const modeFlag = () => {
    return devFlag ? false : true;
};
const entry = () => {
    const entries = glob
        .sync(
            '**/*.js',
            {
                cwd: './src/',
                ignore: [
                    '**/_*.js'
                ]
            }
        )
        .map(function (key) {
            return [key, path.resolve('./src/', key)];
        });
    return Object.fromEntries(entries)
};
const configs = {
    mode: mode(),
    entry: entry(),
    output: {
        filename: '[name]'
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                `${'./dist/'}/**/*.js`
            ],
        }),
    ],
    optimization: {
            minimizer: [
            new webpackTerser({
                extractComments: 'some',
                terserOptions: {
                    compress: {
                        drop_console: modeFlag(),
                    },
                },
            }),
        ],
    }
};
if (devFlag === 'dev') {
    configs.devtool = 'inline-source-map';
}

module.exports = configs;
