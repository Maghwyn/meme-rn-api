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
		domain: string;
		isHttps: boolean;
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
	}
}
