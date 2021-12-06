module.exports = {
    root: true,
    extends: '@react-native-community',
    parser: '@babel/eslint-parser',
    parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 2020,
        sourceType: 'module',
        project: './tsconfig.json',
    },
    settings: {
        react: { version: 'detect' },
        'import/resolver': {
            'babel-module': {},
        },
        node: {
            extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
        },
    },
    rules: {
        'no-restricted-imports': ['error'],
    },
};
