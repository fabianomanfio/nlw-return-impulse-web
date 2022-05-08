import { SubmitFeedbackUseCase } from './submit-feedbacks-use-case'

// spies = espiões
const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();


const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
)

describe('Submit Feedback', () => {
  it('it be able to submit a feedback', async () => {

    await expect(submitFeedback.execute({
      type: 'BYG',
      comment: 'example comment',
      screenshot: 'data:image/png;base64, asdaksdahsdkajhdkajhds',
    })).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  })
 
  it('should not be able to submit a feedback without a type', async () => {

    await expect(submitFeedback.execute({
      type: '',
      comment: 'example comment',
      screenshot: 'data:image/png;base64, asdaksdahsdkajhdkajhds',
    })).rejects.toThrow();
  })

  it('should not be able to submit a feedback without a comment', async () => {

    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: '',
      screenshot: 'date:image/png;base64, asdaksdahsdkajhdkajhds',
    })).rejects.toThrow();
  })

  it('should not be able to submit a feedback with an invalid screenshot', async () => {

    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'exemple comment',
      screenshot: 'test.jpg',
    })).rejects.toThrow();
  })
})