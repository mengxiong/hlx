import { request } from 'src/request';

export interface PageParams {
  page: number;
  size: number;
}

export interface ListPageSize<T> {
  page: number;
  size: number;
  totalPages: number;
  totalElements: number;
  content: T[];
}

/*
  lastDoTime: "2022.07.10"
  onlineAllScore: "118"
  onlineScore: "118"
  studyRate: "86.0"
  studyTime: "17421"
  studyTimeDesc: "4时50分21秒"
  textbookName: "英语A"
  unitName: "第1课"
*/
export interface StudyRecordContent {
  textbookName: string;
  unitName: string;
  lastDoTime: string;
  onlineScore: string;
  onlineAllScore: string;
  studyTime: string;
  studyTimeDesc: string;
  studyRate: string;
}

/* {
  "examName": "21年考研英语一真题",
  "examSubType": "001002",
  "examYesNum": "15",
  "examNoNum": "34",
  "examTime": "7454",
  "examTimeDesc": "2时4分14秒",
  "createTime": "2022.08.12"
} */
export interface ExamRecordContent {
  examName: string;
  examSubType: string;
  examYesNum: string;
  examNoNum: string;
  examTime: string;
  examTimeDesc: string;
  createTime: string;
}

export function getStudyRecord(params: PageParams = { page: 0, size: 10 }) {
  return request.post<any, ListPageSize<StudyRecordContent>>('/study/record', params);
}

export function getExamRecord(params: PageParams = { page: 0, size: 10 }) {
  return request.post<any, ListPageSize<ExamRecordContent>>('/exam/record', params);
}
