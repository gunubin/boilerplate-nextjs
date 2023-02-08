module.exports = {
  root: true,
  overrides: [
    {
      files: ['*.js'],
      env: {
        es6: true,
        node: true,
      },
      parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
      },
      extends: ['eslint:recommended', 'prettier'],
    },
    {
      env: {
        es6: true,
      },
      files: ['**/*.ts?(x)'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        sourceType: 'module',
      },
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'prettier',
      ],
      plugins: ['react-hooks', 'eslint-plugin-import'],
      rules: {
        // @typescript-eslintでエラーを検出したい為、eslint側のno-unused-varsはoffに設定
        'no-unused-vars': 'off',
        'no-console': [
          'error',
          {
            allow: ['warn', 'error', 'info', 'table'],
          },
        ],
        'import/no-useless-path-segments': [
          'error',
          {
            noUselessIndex: true,
          },
        ],
        'import/no-duplicates': [
          'error',
          {
            considerQueryString: true,
          },
        ],
        'import/order': [
          'error',
          {
            groups: ['builtin', 'external', 'internal', 'sibling', 'parent', 'index'],
            pathGroups: [
              {
                pattern: '@app/**',
                group: 'internal',
                position: 'before',
              },
              {
                pattern: '@{mobile,web}/styles/**',
                group: 'internal',
                position: 'after',
              },
              {
                /* TODO: dir増えるごとに編集するの面倒 */
                pattern: '@{mobile,web,assets}/**',
                group: 'internal',
              },
            ],
            pathGroupsExcludedImportTypes: ['builtin'],
            alphabetize: {order: 'asc'},
            'newlines-between': 'always',
          },
        ],
        quotes: ['error', 'single'],
        'sort-keys': [2, 'asc', {caseSensitive: true, natural: true}],
        'react/jsx-key': [2, {checkFragmentShorthand: true}],
        // TypeScriptでpropsの型をチェックするので、prop-typesはoffに設定
        'react/prop-types': 'off',
        // react-hooks
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'error',
        // typescript-eslint
        '@typescript-eslint/no-explicit-any': 'off', // FIXME: よくない
      },
    },
  ],
};
