import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prismaService.js';

const PROFILE_INCLUDE = {
  skills: { orderBy: { position: 'asc' } },
  experience: { orderBy: { positionIndex: 'asc' } },
  projects: { orderBy: { position: 'asc' } },
} satisfies Prisma.ProfileInclude;

export type ProfileRecord = Prisma.ProfileGetPayload<{ include: typeof PROFILE_INCLUDE }>;

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async getProfile(): Promise<ProfileRecord | null> {
    return this.prisma.profile.findUnique({
      where: { slug: 'main' },
      relationLoadStrategy: 'join',
      include: PROFILE_INCLUDE,
    });
  }
}
