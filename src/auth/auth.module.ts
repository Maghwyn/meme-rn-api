import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { config } from '@/config/config';
import { AuthService } from '@/auth/auth.service';
import { AuthController } from '@/auth/auth.controller';
import { JwtStrategy } from '@/auth/strategies/jwt.strategy';
import { LocalStrategy } from '@/auth/strategies/local.strategy';
import { UsersModule } from '@/users/users.module';
import { MailjetEventEmitter } from '@/mailjet/events/mj.events';
import { MailjetListeners } from '@/mailjet/mailjet.listeners';
import { MailjetModule } from '@/mailjet/mailjet.module';
import { TokensRepository } from '@/auth/tokens.repository';
import { DatabaseModule } from '@/database/database.module';

@Module({
	imports: [
		DatabaseModule.forRoot(),
		UsersModule,
		MailjetModule,
		PassportModule,
		JwtModule.register({
			secret: config.jwt.secret,
			signOptions: { expiresIn: '7d' },
		}),
	],
	providers: [
		AuthService,
		JwtStrategy,
		LocalStrategy,
		TokensRepository,
		MailjetEventEmitter,
		MailjetListeners,
	],
	controllers: [AuthController],
})
export class AuthModule {}
