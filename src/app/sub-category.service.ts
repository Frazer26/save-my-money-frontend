import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SubCategory} from './sub-category';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {

  private readonly subcategoryURL: string;

  constructor(private http: HttpClient) {
    this.subcategoryURL = 'http://localhost:8080/budget/COST';
  }

  public getSubCategories(): Observable<SubCategory[]> {
    return this.http.get<SubCategory[]>(this.subcategoryURL );
  }

  // public addSubCategoryUnderCost(subCategory: SubCategory) {
  //   return this.http.post<SubCategory>(this.subcategoryURL, JSON.stringify(subCategory), httpOptions);
  // }

  public deleteSubCategory(subCategory: SubCategory): Observable<SubCategory[]> {
    return this.http.delete<SubCategory[]>(this.subcategoryURL + '/deleteSubcategory/' + subCategory.id);
  }
  //
  // public updateItem(itemId: number, item: SubCategory) {
  //   return this.http.put(this.itemUrl + 'updateItem/' + itemId, item, httpOptions);
  // }
}
