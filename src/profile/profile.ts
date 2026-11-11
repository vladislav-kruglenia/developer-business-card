import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Skill {
  @Field()
  name!: string;
}

@ObjectType()
export class Experience {
  @Field()
  company!: string;

  @Field()
  position!: string;

  @Field()
  period!: string;

  @Field(() => [String])
  achievements!: string[];
}

@ObjectType()
export class Project {
  @Field()
  name!: string;

  @Field()
  description!: string;

  @Field(() => String, { nullable: true })
  url!: string | null;
}

@ObjectType()
export class Profile {
  @Field()
  name!: string;

  @Field()
  description!: string;

  @Field(() => String, { nullable: true })
  githubUrl!: string | null;

  @Field(() => String, { nullable: true })
  linkedinUrl!: string | null;

  @Field(() => String, { nullable: true })
  websiteUrl!: string | null;

  @Field(() => [Skill])
  skills!: Skill[];

  @Field(() => [Experience])
  experience!: Experience[];

  @Field(() => [Project])
  projects!: Project[];
}
