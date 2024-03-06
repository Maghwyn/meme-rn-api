import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { DatabaseModule } from '@/database/database.module';
import { MailjetModule } from '@/mailjet/mailjet.module';
import { UsersModule } from '@/users/users.module';

@Module({
	imports: [EventEmitterModule.forRoot(), DatabaseModule.forRoot(), MailjetModule, UsersModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
