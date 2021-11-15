import {Item} from "./item";

export interface Todolist {
  id: number;
  title: string;
  color: string;
  textcolor: string;
  items : Array<Item>;
}
