import { Query, Resolver } from '@nestjs/graphql';
import { Profile } from './profile.js';
import { ProfileService } from './profileService.js';

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Query(() => Profile, { nullable: true })
  async profile(): Promise<Profile | null> {
    return this.profileService.getProfile();
  }
}
