import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { QuestionsRepository } from "../repositories/question-repository";
import { QuestionComment } from "../../enterprise/entities/question-comment";
import { QuestionCommentsRepository } from "../repositories/question-comments-repository";
import { Either, left, right } from "@/core/either";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface CommentOnQuestionRequest {
  authorId: string;
  questionId: string;
  content: string;
}

type CommentOnQuestionUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    questionComment: QuestionComment;
  }
>;

export class CommentOnQuestionUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private questionsCommentRepository: QuestionCommentsRepository
  ) {}
  async execute({
    authorId,
    questionId,
    content,
  }: CommentOnQuestionRequest): Promise<CommentOnQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId);

    if (!question) {
      return left(new ResourceNotFoundError());
    }

    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityID(authorId),
      questionId: new UniqueEntityID(questionId),
      content,
    });

    await this.questionsCommentRepository.create(questionComment);

    return right({ questionComment });
  }
}
