import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Logger as NestLogger } from '@nestjs/common';

import { config } from '@/config/config';
import { JwtPayload } from '@/common/interfaces/jwt.interface';
import { convertToObjectId } from '@/common/helpers/string.helper';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
	constructor() {
		super({
			ignoreExpiration: false,
			secretOrKey: config.jwt.secret,
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		});
	}

	async validate(payload: JwtPayload) {
		//! Should never happen, but just in case
		if (!payload?.id) {
			NestLogger.fatal('Fatal security error, the jwt was decoded by is missing the id');
			throw new UnauthorizedException();
		}

		payload.id = convertToObjectId(payload.id as string);
		return payload;
	}
}
