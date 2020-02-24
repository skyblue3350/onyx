const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const baseConfig= {
    mode: 'development',
    watch: true,
    node: {
        __dirname: false,
        __filename: false,
    },
    module: {
        rules: [
            {
                exclude: /node_modules/,
                test: /\.(ts|tsx)$/,
                use: 'ts-loader',
            },
            {
                test: /\.(css)$/,
                use: [
                    {loader: 'style-loader'},
                    {loader: 'css-loader'},
                ],
            },
            {
                test: /\.(ttf|eot|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader',
                options: {
                    publicPath: './'
                }
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: 'file-loader'
            }
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    performance: {
        hints: false
    }
}

module.exports = [
    {
        ...baseConfig,
        target: 'electron-main',
        entry: {
            main: path.join(__dirname, 'src/browser/index.ts'),
        },
        output: {
            path: path.join(__dirname, 'assets/browser/'),
            filename: '[name].js'
        },
    },
    {
        ...baseConfig,
        target: 'electron-renderer',
        entry: {
            bundle: path.join(__dirname, 'src/renderer/index.tsx'),
        },
        output: {
            path: path.join(__dirname, 'assets/renderer/'),
            filename: '[name].js'
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: 'onyx',
                template: 'src/renderer/index.html',
                meta: {
                    viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
                },
            })
        ]
    }
]
