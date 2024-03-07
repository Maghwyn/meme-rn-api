import { config } from '@/config/config';

export enum Events {
	accountValidated = 'mailjet.account.validated',
	askActivationToken = 'mailjet.token.askActivation',
}

export enum MailjetTemplate {
	accountValidated = config.mailjet.templates.account_validated,
	activationToken = config.mailjet.templates.activation_token,
}
