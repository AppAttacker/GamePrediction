import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionaryModalComponent } from './questionary-modal.component';

describe('QuestionaryModalComponent', () => {
  let component: QuestionaryModalComponent;
  let fixture: ComponentFixture<QuestionaryModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionaryModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionaryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
