import { PrismaClient } from '@prisma/client';
import { profileData } from './profileData.js';

const prisma = new PrismaClient();

const seed = async (): Promise<void> => {
  await prisma.$transaction(async transaction => {
    const profile = await transaction.profile.upsert({
      where: { slug: profileData.slug },
      update: {
        name: profileData.name,
        description: profileData.description,
        githubUrl: profileData.githubUrl,
        linkedinUrl: profileData.linkedinUrl,
        websiteUrl: profileData.websiteUrl,
      },
      create: {
        slug: profileData.slug,
        name: profileData.name,
        description: profileData.description,
        githubUrl: profileData.githubUrl,
        linkedinUrl: profileData.linkedinUrl,
        websiteUrl: profileData.websiteUrl,
      },
    });

    await transaction.skill.deleteMany({ where: { profileId: profile.id } });
    await transaction.experience.deleteMany({ where: { profileId: profile.id } });
    await transaction.project.deleteMany({ where: { profileId: profile.id } });

    await transaction.skill.createMany({
      data: profileData.skills.map((name, position) => ({ name, position, profileId: profile.id })),
    });
    await transaction.experience.createMany({
      data: profileData.experience.map((experience, positionIndex) => ({
        ...experience,
        achievements: [...experience.achievements],
        positionIndex,
        profileId: profile.id,
      })),
    });
    await transaction.project.createMany({
      data: profileData.projects.map((project, position) => ({ ...project, position, profileId: profile.id })),
    });
  });
};

seed()
  .catch(error => {
    console.error('Не удалось заполнить базу данных профилем.', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
