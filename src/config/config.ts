import { EnvConfiguration } from '@/config/interfaces/config.interface';

// Ensure type checking
export const config = {
	app: {
		env: process.env.NODE_ENV,
		port: process.env.NEST_API_PORT,
		domain: process.env.NEST_API_DOMAIN,
		isHttps: JSON.parse(process.env.NEST_API_IS_HTTPS),
		fileSizeLimit: parseInt(process.env.NEST_APP_FILE_SIZE_MB_LIMIT),
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
		templates: {
			account_validated: parseInt(process.env.MAILJET_TEMPLATE_ACCOUNT_VALIDATED) || -1,
			activation_token: parseInt(process.env.MAILJET_TEMPLATE_ACTIVATION_TOKEN) || -1,
		},
	},
} satisfies EnvConfiguration;
