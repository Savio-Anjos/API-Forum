import { Either, left, right } from "@/core/either";
import { QuestionCommentsRepository } from "../repositories/question-comments-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { NotAllowedError } from "./errors/not-allowed-error";

interface DeleteQuestionCommentRequest {
  authorId: string;
  questionCommentId: string;
}

type DeleteQuestionCommentUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {}
>;

export class DeleteQuestionCommentUseCase {
  constructor(private questionsCommentRepository: QuestionCommentsRepository) {}
  async execute({
    authorId,
    questionCommentId,
  }: DeleteQuestionCommentRequest): Promise<DeleteQuestionCommentUseCaseResponse> {
    const questionComment = await this.questionsCommentRepository.findById(
      questionCommentId
    );

    if (!questionComment) {
      return left(new ResourceNotFoundError());
    }

    if (questionComment.authorId.toString() !== authorId) {
      return left(new NotAllowedError());
    }

    await this.questionsCommentRepository.delete(questionComment);

    return right({});
  }
}
