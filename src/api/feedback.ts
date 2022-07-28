import { request } from 'src/request';
import { ListPageSize, PageParams } from './studyRecord';

export function createFeedback(content: string) {
  return request.post('common/feedback/add', { content });
}

export interface FeedbackContent {
  id: number;
  recontent: string;
  response: null | string;
  enabled: number;
  createTime: string;
  updateTime: null | string;
}

export function getFeedbackList(params: PageParams) {
  return request.post<any, ListPageSize<FeedbackContent>>('common/feedback/search', params);
}
