/** @type {import('next').NextConfig} */

const withTM = require('next-transpile-modules')(['@stripe/firestore-stripe-payments']); // pass the modules you would like to see transpiled

module.exports = withTM({
	reactStrictMode: true,
	images: {
		domains: ['rb.gy', 'image.tmdb.org'],
	},
	env: {
		NEXT_PUBLIC_TEST_USER_EMAIL: process.env.NEXT_PUBLIC_TEST_USER_EMAIL,
		NEXT_PUBLIC_TEST_USER_PASSWORD: process.env.NEXT_PUBLIC_TEST_USER_PASSWORD,
	},
});
