const withNextra = require('nextra')({
	theme: 'nextra-theme-docs',
	defaultShowCopyCode: true,
	themeConfig: './theme.config.tsx',
})

module.exports = withNextra()
