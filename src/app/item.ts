import {SubCategory} from './sub-category';

export class Item {
  id: number;
  name: string;
  money: number;
  date: Date;
  subCategory: SubCategory;
  mainCategory: string;
  repeat: boolean;
}
