import { ObjectId } from 'mongodb';
import { Response } from 'express';
import { Body, Controller, Post, Res, UseFilters, UseGuards } from '@nestjs/common';

import { AuthService } from '@/auth/auth.service';
import { ServiceErrorCatcher } from '@/common/error/catch.service';
import { LocalAuthGuard } from '@/common/guards/local.guard';
import { JwtAuthGuard } from '@/common/guards/jwt.guard';
import { Jwt } from '@/common/decorators/jwt.decorator';
import { Local } from '@/common/decorators/local.decorator';
import { DTOActivationToken, DTOAuthEmail, DTOAuthSignup } from '@/auth/dto/auth.dto';
import type { LocalPayload } from '@/common/interfaces/local.interface';

@Controller('auth')
@UseFilters(ServiceErrorCatcher)
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('')
	@UseGuards(JwtAuthGuard)
	async isAuth(@Jwt() userId: ObjectId, @Res() res: Response) {
		await this.authService.checkAuth(userId);
		return res.status(200).json();
	}

	@Post('signup')
	async signUp(@Body() body: DTOAuthSignup, @Res() res: Response) {
		await this.authService.signup(body);
		return res.status(201).json();
	}

	@Post('signin')
	@UseGuards(LocalAuthGuard)
	async signin(@Local() user: LocalPayload, @Res() res: Response) {
		const bearer = await this.authService.generateToken(user.id);
		return res.status(200).json(bearer);
	}

	@Post('ask-activation-token')
	async askActivationToken(@Body() body: DTOAuthEmail, @Res() res: Response) {
		await this.authService.askActivationToken(body.email);
		return res.status(201).json();
	}

	@Post('activate')
	async activateAccount(@Body() body: DTOActivationToken, @Res() res: Response) {
		const userId = await this.authService.activateAccount(body);
		const bearer = await this.authService.generateToken(userId);
		return res.status(200).json(bearer);
	}
}
