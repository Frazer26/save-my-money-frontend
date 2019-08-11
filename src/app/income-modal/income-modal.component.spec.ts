import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeModalComponent } from './income-modal.component';

describe('IncomeModalComponent', () => {
  let component: IncomeModalComponent;
  let fixture: ComponentFixture<IncomeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomeModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
