import {Item} from "./item";

export interface Todolist {
  id: number;
  title: string;
  color: string;
  items : Array<Item>;
}
