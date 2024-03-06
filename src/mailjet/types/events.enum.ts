export enum Events {
	accountValidated = 'mailjet.account.validated',
	askActivationToken = 'mailjet.token.askActivation',
	askResetPwdToken = 'mailjet.token.askPwdReset',
}

export enum MailjetTemplate {
	accountValidated = 1212121, // TODO
	activationToken = 1212122, // TODO
	resetPwdToken = 1212123, // TODO
}
