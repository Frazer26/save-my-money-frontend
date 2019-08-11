import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from './item';
import {Observable} from 'rxjs';

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
    return this.http.post<Item>(this.itemUrl + mainCategory, item);
  }
}
