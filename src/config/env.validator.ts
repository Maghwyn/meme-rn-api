import * as dotenv from 'dotenv';
dotenv.config();

// \n compatible for macOS and Window
import { EOL } from 'os';

const envsToCheck = [
	'NEST_API_PORT',
	'NEST_API_URL',
	'NEST_APP_FILE_SIZE_MB_LIMIT',
	'MONGO_URI',
	'MONGO_DBNAME',
	'JWT_SECRET',
	'MAILJET_USER',
	'MAILJET_PASS',
	'MAILJET_TEMPLATE_ACCOUNT_VALIDATED',
	'MAILJET_TEMPLATE_ACTIVATION_TOKEN',
];

const missing = [];
for (const checked of envsToCheck) {
	if (!process.env[checked]) missing.push(`undefined process.env.${checked}`);
}

if (missing.length > 0) {
	throw new Error(`${EOL}${missing.join(EOL)}${EOL}Trace:`);
}
