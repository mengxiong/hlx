import { request } from 'src/request';

interface PageParams {
  page: number;
  size: number;
}

export interface StudyRecord {
  page: number;
  size: number;
  totalPages: number;
  totalElements: number;
  content: StudyRecordContent[];
}

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
export function getStudyRecord(params: PageParams = { page: 0, size: 10 }) {
  return request.post<any, StudyRecord>('/fc/study/record', params);
}
