import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Item} from './item';
import {Observable} from 'rxjs';
import {SubCategory} from "./sub-category";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private readonly itemUrl: string;
  private readonly itemUnderSubCategoryUrl: string;

  constructor(private http: HttpClient) {
    this.itemUrl = 'http://localhost:8080/budget/';
    this.itemUnderSubCategoryUrl = 'http://localhost:8080/budget/subcategory/';
  }

  public getItemsBetweenDates(mainCategory: string, startDate, endDate): Observable<Item[]> {
    const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);

    return this.http.get<Item[]>(this.itemUrl + mainCategory, {params});
  }

  public getAllItemsUnderSubCategories(): Observable<Item[]> {
    return this.http.get<Item[]>(this.itemUnderSubCategoryUrl);
  }

  public addItemUnderMainCategory(mainCategory: string, item: Item) {
    return this.http.post<Item>(this.itemUrl + mainCategory, JSON.stringify(item), httpOptions);
  }

  public addItemUnderSubCategory(subCategoryName: string, item: Item) {
    return this.http.post<Item>(this.itemUnderSubCategoryUrl + subCategoryName, JSON.stringify(item), httpOptions);
  }

  public deleteItem(item: Item): Observable<Item[]> {
    return this.http.delete<Item[]>(this.itemUrl + 'deleteItem/' + item.id);
  }

  public updateItem(itemId: number, item: Item) {
    return this.http.put(this.itemUrl + 'updateItem/' + itemId, item, httpOptions);
  }
}
