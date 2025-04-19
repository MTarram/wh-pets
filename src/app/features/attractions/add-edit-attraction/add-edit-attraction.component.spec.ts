import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditAttractionComponent } from './add-edit-attraction.component';

describe('AddEditAttractionComponent', () => {
  let component: AddEditAttractionComponent;
  let fixture: ComponentFixture<AddEditAttractionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditAttractionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditAttractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
