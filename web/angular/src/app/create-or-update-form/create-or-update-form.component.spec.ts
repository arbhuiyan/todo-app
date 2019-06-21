import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrUpdateFormComponent } from './create-or-update-form.component';

describe('CreateOrUpdateFormComponent', () => {
  let component: CreateOrUpdateFormComponent;
  let fixture: ComponentFixture<CreateOrUpdateFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateOrUpdateFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrUpdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
