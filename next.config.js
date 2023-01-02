/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	swcMinify: true,
};

module.exports = {
	trailingSlash: true,
	images: {
		unoptimized: true,
	},
	experimental: {
		images: {
			unoptimized: true,
		},
	},
	...nextConfig,
};
