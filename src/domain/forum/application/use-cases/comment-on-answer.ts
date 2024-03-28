import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { AnswerComment } from "../../enterprise/entities/answer-comment";
import { AnswerCommentsRepository } from "../repositories/answer-comments-repository";
import { AnswersRepository } from "../repositories/answers-repository";
import { Either, left, right } from "@/core/either";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface CommentOnAnswer {
  authorId: string;
  answerId: string;
  content: string;
}

type CommentOnAnswerUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    answerComment: AnswerComment;
  }
>;

export class CommentOnAnswerUseCase {
  constructor(
    private answersRepository: AnswersRepository,
    private answersCommentRepository: AnswerCommentsRepository
  ) {}
  async execute({
    authorId,
    answerId,
    content,
  }: CommentOnAnswer): Promise<CommentOnAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) {
      return left(new ResourceNotFoundError());
    }

    const answerComment = AnswerComment.create({
      authorId: new UniqueEntityID(authorId),
      answerId: new UniqueEntityID(answerId),
      content,
    });

    await this.answersCommentRepository.create(answerComment);

    return right({ answerComment });
  }
}
