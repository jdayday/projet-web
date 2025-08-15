import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupRoleSelectComponent } from './signup-role-select.component';

describe('SignupRoleSelectComponent', () => {
  let component: SignupRoleSelectComponent;
  let fixture: ComponentFixture<SignupRoleSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupRoleSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupRoleSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
