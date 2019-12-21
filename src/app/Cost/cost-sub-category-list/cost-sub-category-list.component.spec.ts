import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostSubCategoryListComponent } from './cost-sub-category-list.component';

describe('CostSubCategoryListComponent', () => {
  let component: CostSubCategoryListComponent;
  let fixture: ComponentFixture<CostSubCategoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostSubCategoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostSubCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
