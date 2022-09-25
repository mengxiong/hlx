import { request } from 'src/request';
import { Attach } from './study';
import { TextbookType } from './textbook';

export interface ExamsParams {
  deptId: number;
  subType: TextbookType;
}

export interface ExamData {
  id: string;
  subType: string;
  examName: string;
  examDesc: string;
  examFocus: string;
  examTotal: string;
}

export interface ExamDetailData {
  id: string;
  sort: string;
  title: string;
  attachFlag: string;
  attach?: Attach;
  type: ExamType;
  answer: string;
  options?: Option[];
}

export const enum ExamType {
  Write = '003001', // 填空
  Select = '003002', // 选择
}

export interface Option {
  label: string;
  content: string;
  sort: string;
}

export interface CommitExamParams {
  endTime: string;
  examId: string;
  examNoNum: number;
  examTime: number; // s
  examYesNum: number;
  startTime: string;
}

export function getExams(params: ExamsParams) {
  return request.post<any, ExamData[]>('/exam/search', params);
}

export function getExamDetail(id: string) {
  return request.post<any, ExamDetailData[]>('/exam/detail', { id });
}

export function commitExam(params: CommitExamParams) {
  return request.post('/exam/commit', params);
}
