import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EstantePage } from './estante.page';

describe('EstantePage', () => {
  let component: EstantePage;
  let fixture: ComponentFixture<EstantePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EstantePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
