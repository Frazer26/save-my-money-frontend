import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Item} from './item';
import {Observable} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private readonly itemUrl: string;

  constructor(private http: HttpClient) {
    this.itemUrl = 'http://localhost:8080/budget/';
  }

  public findAll(mainCategory: string): Observable<Item[]> {
    return this.http.get<Item[]>(this.itemUrl + mainCategory);
  }

  public addItemUnderMainCategory(mainCategory: string, item: Item) {
    return this.http.post<Item>(this.itemUrl + mainCategory, JSON.stringify(item), httpOptions);
  }

  public deleteItem(item: Item): Observable<Item[]> {
    return this.http.delete<Item[]>(this.itemUrl + 'deleteItem/' + item.id);
  }

  public updateItem(item: Item) {
    return this.http.put(this.itemUrl + 'updateItem/' + item.id, item, httpOptions);
  }
}
