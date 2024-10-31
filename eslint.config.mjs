// @ts-check

import eslintConfigCodely from 'eslint-config-codely';

export default [
	...eslintConfigCodely.ts,
	{
		// You should add the path to your tsconfig
		files: ['**/*.ts', '**/*.tsx'],
		languageOptions: {
			parserOptions: {
				project: ['./tsconfig.json'],
				ecmaVersion: 2022,
			},
		},
		// Your config here
		rules: {
			'@typescript-eslint/no-floating-promises': 'warn',
			'@typescript-eslint/no-unused-vars': 'warn',
			'@typescript-eslint/explicit-function-return-type': 'error',
			'@typescript-eslint/no-unnecessary-condition': 'off',
			'@typescript-eslint/no-unsafe-assignment': 'off',
			'@typescript-eslint/no-unsafe-call': 'off',
			'@typescript-eslint/no-unsafe-member-access': 'off',
			'@typescript-eslint/no-unsafe-return': 'off',
			'@typescript-eslint/prefer-nullish-coalescing': 'off',
			'@typescript-eslint/ban-ts-comment': 'off',
			'@typescript-eslint/restrict-template-expressions': 'off',
			'@typescript-eslint/explicit-module-boundary-types': 'off',
			'import/no-unresolved': 'off',
			'import/no-duplicates': 'off',
			'no-use-before-define': 'warn',
			'no-await-in-loop': 'off',
			'no-console': 'off',
		},
	},
	{
		files: ['**/*.dto.ts', '**/*.entity.ts'],
		rules: {
			'no-use-before-define': 'off',
		},
	},
];
