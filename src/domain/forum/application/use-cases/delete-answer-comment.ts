import { Either, left, right } from "@/core/either";
import { AnswerCommentsRepository } from "../repositories/answer-comments-repository";

interface DeleteAnswerCommentRequest {
  authorId: string;
  answerCommentId: string;
}

type DeleteAnswerCommentUseCaseResponse = Either<string, {}>;

export class DeleteAnswerCommentUseCase {
  constructor(private answersCommentRepository: AnswerCommentsRepository) {}
  async execute({
    authorId,
    answerCommentId,
  }: DeleteAnswerCommentRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
    const answerComment = await this.answersCommentRepository.findById(
      answerCommentId
    );

    if (!answerComment) {
      return left("Answer comment not found.");
    }

    if (answerComment.authorId.toString() !== authorId) {
      return left("Not allowed");
    }

    await this.answersCommentRepository.delete(answerComment);

    return right({});
  }
}
