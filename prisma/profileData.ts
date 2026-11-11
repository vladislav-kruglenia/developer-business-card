type ProfileExperience = {
  company: string;
  position: string;
  period: string;
  achievements: string[];
};

export const profileData = {
  slug: 'main',
  name: 'Vlad',
  description:
    'Разработчик ПО с опытом работы с TypeScript в продуктовой web-разработке. Сейчас развиваю backend-направление на Node.js, NestJS, Prisma и PostgreSQL.',
  githubUrl: null,
  linkedinUrl: null,
  websiteUrl: null,
  skills: [
    'TypeScript',
    'Node.js',
    'NestJS',
    'GraphQL',
    'PostgreSQL',
    'Prisma',
    'Docker',
    'React',
    'MobX',
    'Meteor',
    'MongoDB',
  ],
  experience: [] as ProfileExperience[],
  projects: [
    {
      name: 'Цифровая визитка разработчика',
      description: 'Backend-приложение на NestJS и GraphQL с PostgreSQL, Prisma и запуском в Docker.',
      url: null,
    },
  ],
};
