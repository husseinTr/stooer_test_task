import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdatePostDialogComponent } from './create-update-post-dialog.component';

describe('CreateUpdatePostDialogComponent', () => {
  let component: CreateUpdatePostDialogComponent;
  let fixture: ComponentFixture<CreateUpdatePostDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdatePostDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdatePostDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
