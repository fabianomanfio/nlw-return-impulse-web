export interface FeedbackCreateDate {
  type: string;
  comment: string;
  scheenshot?: string;
}


export interface FeedbacksRepository {
  create: (data: FeedbackCreateDate) => Promise<void>;
}
