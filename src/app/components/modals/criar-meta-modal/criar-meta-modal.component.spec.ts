import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarMetaModalComponent } from './criar-meta-modal.component';

describe('CriarMetaModalComponent', () => {
  let component: CriarMetaModalComponent;
  let fixture: ComponentFixture<CriarMetaModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CriarMetaModalComponent]
    });
    fixture = TestBed.createComponent(CriarMetaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
