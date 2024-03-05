import { EnvConfiguration } from '@/config/interfaces/config.interface';

// Ensure type checking
export const config: EnvConfiguration = {
	app: {
		env: process.env.NODE_ENV,
		port: process.env.API_PORT,
		domain: process.env.API_DOMAIN,
		isHttps: JSON.parse(process.env.API_IS_HTTPS),
	},
	mongo: {
		uri: process.env.MONGO_URI,
		dbname: process.env.MONGO_DBNAME,
	},
	jwt: {
		secret: process.env.JWT_SECRET,
	},
	mailjet: {
		user: process.env.MAILJET_USER,
		pass: process.env.MAILJET_PASS,
	},
};