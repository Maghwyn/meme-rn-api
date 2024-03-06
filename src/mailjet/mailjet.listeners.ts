import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { MailjetService } from '@/mailjet/mailjet.service';
import { MailjetEmail, MailjetAskToken } from '@/mailjet/events/mj.events.req';
import { Events, MailjetTemplate } from '@/mailjet/types/events.enum';

Injectable();
export class MailjetListeners {
	constructor(
		@Inject(MailjetService)
		private readonly mailjetService: MailjetService,
	) {}

	@OnEvent(Events.accountValidated)
	async handleAccountValidated(payload: MailjetEmail) {
		const { email } = payload;

		this.mailjetService.sendUniversalEmail({
			templateId: MailjetTemplate.accountValidated,
			recipients: [{ Email: email }],
		});
	}

	@OnEvent(Events.askActivationToken)
	async handleAskActivationToken(payload: MailjetAskToken) {
		const { email, token } = payload;

		this.mailjetService.sendUniversalEmail({
			templateId: MailjetTemplate.activationToken,
			recipients: [{ Email: email }],
			args: { code: token },
		});
	}

	@OnEvent(Events.askResetPwdToken)
	async handleAskResetToken(payload: MailjetAskToken) {
		const { email, token } = payload;

		this.mailjetService.sendUniversalEmail({
			templateId: MailjetTemplate.resetPwdToken,
			recipients: [{ Email: email }],
			args: { token },
		});
	}
}
