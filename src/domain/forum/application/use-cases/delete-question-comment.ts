import { QuestionCommentsRepository } from "../repositories/question-comments-repository";

interface DeleteQuestionCommentRequest {
  authorId: string;
  questionCommentId: string;
}

interface DeleteQuestionCommentUseCaseResponse {}

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
      throw new Error("Question comment not found.");
    }

    if (questionComment.authorId.toString() !== authorId) {
      throw new Error("Not allowed");
    }

    await this.questionsCommentRepository.delete(questionComment);

    return {};
  }
}
