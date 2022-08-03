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

// createTime: "2021-12-23 14:46:39"
// enabled: 1
// id: 32
// recontent: "11111"
// response: "啊"
// updateTime: "2021-12-23 15:21:20"

export function getFeedbackList(params: PageParams) {
  return request.post<any, ListPageSize<FeedbackContent>>('common/feedback/search', params);
}
