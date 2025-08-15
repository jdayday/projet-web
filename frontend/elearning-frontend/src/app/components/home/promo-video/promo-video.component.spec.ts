import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoVideoComponent } from './promo-video.component';

describe('PromoVideoComponent', () => {
  let component: PromoVideoComponent;
  let fixture: ComponentFixture<PromoVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromoVideoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromoVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
