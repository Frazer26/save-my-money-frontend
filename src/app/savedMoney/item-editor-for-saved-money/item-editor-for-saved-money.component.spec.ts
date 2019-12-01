import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemEditorForSavedMoneyComponent } from './item-editor-for-saved-money.component';

describe('ItemEditorForSavedMoneyComponent', () => {
  let component: ItemEditorForSavedMoneyComponent;
  let fixture: ComponentFixture<ItemEditorForSavedMoneyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemEditorForSavedMoneyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemEditorForSavedMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
