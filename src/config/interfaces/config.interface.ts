export interface EnvConfiguration {
	app: Configuration.Application;
	mongo: Configuration.MongoDB;
	jwt: Configuration.JWT;
	mailjet: Configuration.Mailjet;
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Configuration {
	export interface Application {
		env: string;
		port: string;
		url: string;
		fileSizeLimit: number;
	}

	export interface MongoDB {
		uri: string;
		dbname: string;
	}

	export interface JWT {
		secret: string;
	}

	export interface Mailjet {
		user: string;
		pass: string;
		templates: MailjetTemplate;
	}

	export interface MailjetTemplate {
		account_validated: number;
		activation_token: number;
	}
}
