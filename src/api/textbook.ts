import { request } from 'src/request';
import { delay } from 'src/util';

export interface TextBooks {
  textBooks: TextBook[];
  firstUnits: TextBookUnit[];
}

export interface TextBook {
  id: string;
  label: string;
  imageUrl: string;
  totalUnit: string;
  selected: string;
  desc: string;
  subType: string;
}

export interface TextBookUnit {
  id: string;
  textbookId: string;
  title: string;
  enabled: string;
  selected: string; // '1' 是选中
  tsort: string;
}

export interface TextBookUnitStep {
  textbookId: string;
  unitId: string;
  title: string;
  stepNum: string;
  stepValue: string;
  finished: string; // "0" 锁住, '1' ok
}

export const enum TextbookType {
  Chinese = '001001',
  English = '001002',
}

/**
 * 获取课程
 * @param type '001001' 是汉语 '001002' 是英语
 */
export function getTextbooks(subType = TextbookType.English) {
  return request.post<any, TextBooks>('/fc/study/authtextbook', { subType });
}

/**
 * 获取课程的单元
 * @param id 课程id
 */
export function getTextbookUnit(id: string) {
  return request.post<any, TextBookUnit[]>('/fc/study/textbook/unit', { id });
}

/**
 * 获取单元的步骤
 * @param values
 */
export function getTextbookUnitStep(values: { textbookId: string; unitId: string }) {
  return request.post<any, TextBookUnitStep[]>('/fc/study/textbook/step', values);
}
