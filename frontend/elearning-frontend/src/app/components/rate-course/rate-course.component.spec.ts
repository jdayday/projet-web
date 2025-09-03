import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateCourseComponent } from './rate-course.component';

describe('RateCourseComponent', () => {
  let component: RateCourseComponent;
  let fixture: ComponentFixture<RateCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RateCourseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RateCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
