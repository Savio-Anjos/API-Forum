import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Question } from "@/domain/forum/enterprise/entities/question";
import { Slug } from "@/domain/forum/enterprise/entities/value-objects/slug";
import { QuestionProps } from "./../../src/domain/forum/enterprise/entities/question";

export function makQuestion(override: Partial<QuestionProps> = {}) {
  const question = Question.create({
    authorId: new UniqueEntityID(),
    title: "Example Question",
    slug: Slug.create("example-question"),
    content: "Example content",
    ...override,
  });

  return question;
}
