module.exports = {
    presets: [
        'module:metro-react-native-babel-preset',
        [
            '@babel/preset-env',
            {
                targets: {
                    node: 'current',
                },
            },
        ],
        '@babel/preset-typescript',
    ],
    plugins: [
        [
            'module-resolver',
            {
                root: ['./'],
                extensions: ['.ts', '.tsx', '.js', '.json'],
                alias: [
                    {
                        '@screens': './src/screens',
                        '@utils': './src/utils',
                        '@helpers': './src/helpers',
                        '@components': './src/components',
                    },
                ],
            },
        ],
        ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
    ],
};
