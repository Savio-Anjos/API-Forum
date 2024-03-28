import { Either, left, right } from "@/core/either";
import { QuestionsRepository } from "../repositories/question-repository";
import { Question } from "./../../enterprise/entities/question";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface GetQuestionBySlugUseCaseRequest {
  slug: string;
}

type GetQuestionBySlugUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    question: Question;
  }
>;

export class GetQuestionBySlugUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}
  async execute({
    slug,
  }: GetQuestionBySlugUseCaseRequest): Promise<GetQuestionBySlugUseCaseResponse> {
    const question = await this.questionsRepository.findBySlug(slug);

    if (!question) {
      return left(new ResourceNotFoundError());
    }

    return right({ question });
  }
}
