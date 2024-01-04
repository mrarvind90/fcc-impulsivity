/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [{ hostname: '*.unsplash.com' }, { hostname: 'lh3.googleusercontent.com' }],
	},
	experimental: {
		serverActions: true,
	},
};

module.exports = nextConfig;
