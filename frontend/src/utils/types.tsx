// 账单
export interface Bill {
  id?: number;
  time: Date;
  category: string;
  type: BillType;
  amount: number;
  [index: string]: any;
}
// 账单收支类型 花费或赚取
export enum BillType {
  Cost,
  Earn,
}
// 分类
export interface Category {
  id?: string;
  name: string;
  type: string;
  [index: string]: any;
}
// 过滤器
export interface Filter {
  id?: number;
  time?: string;
  category?: string;
  type?: string;
  amount?: number;
  [index: string]: any;
}
// 新帐单的表单
export interface Form extends Filter {
  show?: boolean;
}
// 收支统计
export interface Summary {
  income: number;
  expenditure: number;
  byCategories: Map<string, number>;
}
// reducer action
export interface Action {
  type: string;
  value: any;
}
