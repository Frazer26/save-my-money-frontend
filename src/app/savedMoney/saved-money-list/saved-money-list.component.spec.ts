import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedMoneyListComponent } from './saved-money-list.component';

describe('SavedMoneyListComponent', () => {
  let component: SavedMoneyListComponent;
  let fixture: ComponentFixture<SavedMoneyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavedMoneyListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedMoneyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
