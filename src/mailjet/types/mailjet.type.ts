export type EmailConstructorOptions = {
	templateId: number;
	senders?: EmailRecipient;
	recipients: Array<EmailRecipient>;
	args?: Record<string, number | string | Array<string> | Array<number> | boolean>;
};

export type EmailRecipient = {
	Email: string;
	Name?: string;
};
