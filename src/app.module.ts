import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { DatabaseModule } from '@/database/database.module';
import { AuthModule } from '@/auth/auth.module';
import { MailjetModule } from '@/mailjet/mailjet.module';
import { UsersModule } from '@/users/users.module';
import { MemesModule } from '@/memes/memes.module';

@Module({
	imports: [
		EventEmitterModule.forRoot(),
		DatabaseModule.forRoot(),
		MailjetModule,
		AuthModule,
		UsersModule,
		MemesModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
