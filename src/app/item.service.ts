import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from './item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private httpClient: HttpClient) { }

  getItems(todoId: string | null): Observable<Item[]> {
    return this.httpClient.get<Item[]>("http://localhost:3000/items?_sort=order&_order=asc&todolistId="+todoId);
  }

  getItemById(id: number): Observable<Item> {
    return this.httpClient.get<Item>("http://localhost:3000/items/" + id);
  }

  postItem(category: Item): Observable<Item> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.post<Item>("http://localhost:3000/items", category, {headers: headers});
  }

  putItem(id:number, category: Item): Observable<Item> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.put<Item>("http://localhost:3000/items/" + id, category, {headers: headers});
  }

  deleteItem(id: number): Observable<Item> {
    console.log('Deleting item with id:' + id)
    return this.httpClient.delete<Item>("http://localhost:3000/items/" + id);
  }
}
