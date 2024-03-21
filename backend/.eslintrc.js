module.exports = {
    plugins: [
        'jest',
      ],
    // Utilize the extendable recommended configurations
    extends: [
    //   'eslint:recommended', 
      'plugin:node/recommended',
      'plugin:jest/recommended'
    ],
    rules: {
        'node/no-unsupported-features/es-syntax': ['error', { version: '>=20.0.0' }]
    }
};
  