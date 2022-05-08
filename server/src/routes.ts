import express from 'express';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';
import { PrismaFeedbacksRepository } from './repositories/prisma/prima-feedbacks-repository';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedbacks-use-case';
export const routes = express.Router();




routes.post('/feedbacks', async (req, res) => {
  const { type, comment, scheenshot } = req.body;

  const prismaFeedbackRepository = new PrismaFeedbacksRepository()
  const nodemailerMailAdapter = new NodemailerMailAdapter()

  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbackRepository,
    nodemailerMailAdapter,
  ) 

  await submitFeedbackUseCase.execute({
    type,
    comment, 
    scheenshot,
  })


  return res.status(201).send()
})

// 1:31:00