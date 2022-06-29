import { request } from 'src/request';

export interface Tips {
  type: string;
  attach?: Attach;
  content?: string;
}

export interface Attach {
  attachType: string;
  attachUrl: string;
}

export interface SortOption {
  content: string;
  value: string; // 对的顺序
  sort: string; // 乱的顺序
}

export interface SelectOption {
  label: string;
  type: string;
  content: string;
  value: string;
}

export interface ReadInfo {
  id: string;
  sort: string;
  content: string;
  translation: string;
  analysis: string;
  audioAttach?: Attach;
  imageAttach?: Attach;
  videoAttach?: Attach;
}

export interface WriteWordInfo {
  id: string;
  sort: string;
  content: string;
  tips: Tips;
  answer: string;
}

export interface SortingInfo extends Partial<ReadInfo> {
  options: SortOption[];
}

export interface SelectionInfo extends Partial<ReadInfo> {
  tips?: Tips;
  answer: string;
  options: SelectOption[];
}

export type WriteSentenceInfo = ReadInfo;
export type SpeakingInfo = ReadInfo;

export interface WriteFullTextInfo extends ReadInfo {
  character?: string;
}

export const enum StepValue {
  Reading = '005006', // 看和听
  WriteWord = '005001', // 填空
  WriteSentenceByAudio = '005015', // 句子听写
  WriteSentenceByTranslation = '005018', // 据译写文
  WriteFullText = '005020', // 默写
  SortSentence = '005009', // 排句成篇
  SortTranslation = '005010', // 译文排序
  SortSentenceByAudio = '005008', // 据音排句
  SortWordByAudio = '005007', // 据音排词
  SortWordByTranslation = '005022', // 据译排词
  Selection = '005005', // 常规选择
  SelectionByAudio = '005002', // 据音选文
  SelectionByContent = '005004', // 据文选择
  SelectionImageByAudio = '005003', // 据音选图
  SpeakingByTranslation = '005017', // 据译说文
  SpeakingByImage = '005012', // 说图
  SpeakingByContent = '005011', // 读句子
}

export type StudyInfoMap = {
  [StepValue.Reading]: ReadInfo[];
  [StepValue.WriteWord]: WriteWordInfo[];
  [StepValue.WriteSentenceByAudio]: WriteSentenceInfo[];
  [StepValue.WriteSentenceByTranslation]: WriteSentenceInfo[];
  [StepValue.WriteFullText]: WriteFullTextInfo[];
  [StepValue.SortSentence]: SortingInfo[];
  [StepValue.SortTranslation]: SortingInfo[];
  [StepValue.SortSentenceByAudio]: SortingInfo[];
  [StepValue.SortWordByAudio]: SortingInfo[];
  [StepValue.SortWordByTranslation]: SortingInfo[];
  [StepValue.Selection]: SelectionInfo[];
  [StepValue.SelectionByAudio]: SelectionInfo[];
  [StepValue.SelectionByContent]: SelectionInfo[];
  [StepValue.SelectionImageByAudio]: SelectionInfo[];
  [StepValue.SpeakingByTranslation]: SpeakingInfo[];
  [StepValue.SpeakingByImage]: SpeakingInfo[];
  [StepValue.SpeakingByContent]: SpeakingInfo[];
};

export type StudyParams<T extends StepValue> = {
  textbookId: string;
  unitId: string;
  stepId: string;
  stepValue: T;
};

export function getStudyInfo<T extends StepValue>(values: StudyParams<T>) {
  return request.post<any, StudyInfoMap[T]>('/fc/study/info/search', values);
}

export interface RecordStudyParams {
  endTime: string;
  startTime: string; // 'YYYY-MM-DD HH:mm:ss'
  studyTime: number; // 秒 endTime - startTime
  stepNum: string;
  stepValue: string;
  textbookId: string;
  unitId: string;
}

export function recordStudy(values: RecordStudyParams) {
  return request.post('/fc/study/confirm', values);
}
