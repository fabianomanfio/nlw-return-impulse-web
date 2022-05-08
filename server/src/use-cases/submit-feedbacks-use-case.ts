import { MailAdapter } from '../adapters/mail.adapter';
import { FeedbacksRepository } from '../repositories/feedbacks-repository';

interface SubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  scheenshot?: string;
}

export class SubmitFeedbackUseCase {    
  constructor(
    private feedbackRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter,
  ) {}

  async execute(request: SubmitFeedbackUseCaseRequest) {
    const { type, comment, scheenshot } = request;

    if(!type) {
      throw new Error('Type is required');
    }

    if(!comment) {
      throw new Error('Comment is required');
    }

    if(scheenshot && !scheenshot.startsWith('data:image/png;base64')) {
      throw new Error('Invalid screenshot format.')
    }

    await this.feedbackRepository.create({
      type,
      comment,
      scheenshot,
    })

    await this.mailAdapter.sendMail({
      subject: 'Novo Feedback',
      body: [
        `<div style="font-family: sans-serif; font-size: 16px; color: #222;">`,
        `<p>Tipo do feedback: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        scheenshot ? `<img src="${scheenshot}" />` : ``,
        `</div>`,
      ].join('\n')
    })

  }
}