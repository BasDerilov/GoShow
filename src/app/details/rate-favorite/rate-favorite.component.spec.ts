import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateFavoriteComponent } from './rate-favorite.component';

describe('RateFavoriteComponent', () => {
  let component: RateFavoriteComponent;
  let fixture: ComponentFixture<RateFavoriteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RateFavoriteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RateFavoriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
