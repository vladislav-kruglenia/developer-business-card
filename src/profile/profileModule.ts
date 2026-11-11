import { Module } from '@nestjs/common';
import { ProfileResolver } from './profileResolver.js';
import { ProfileService } from './profileService.js';

@Module({
  providers: [ProfileResolver, ProfileService],
})
export class ProfileModule {}
