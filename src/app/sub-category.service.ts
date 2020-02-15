import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
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
  private subCategoryInService: SubCategory;

  constructor(private http: HttpClient) {
    this.subcategoryURL = 'http://localhost:8080/budget/COST';
  }

  public getSubCategories(): Observable<SubCategory[]> {
    return this.http.get<SubCategory[]>(this.subcategoryURL);
  }

  public addSubCategoryUnderCost(subCategory: SubCategory) {
    return this.http.post<SubCategory>(this.subcategoryURL, JSON.stringify(subCategory), httpOptions);
  }

  public deleteSubCategory(subCategory: SubCategory): Observable<SubCategory[]> {
    return this.http.delete<SubCategory[]>(this.subcategoryURL + '/deleteSubcategory/' + subCategory.id);
  }


  public updateSubCategory(subCategoryId: number, subCategory: SubCategory) {
    return this.http.put(this.subcategoryURL + '/updateSubCategory/' + subCategoryId, subCategory, httpOptions);
  }

  public setData(subcategory) {
    this.subCategoryInService = subcategory;
  }


  public get getSubCategory(): SubCategory {
    return this.subCategoryInService;
  }
}
