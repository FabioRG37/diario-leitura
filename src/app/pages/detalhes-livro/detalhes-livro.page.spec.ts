import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalhesLivroPage } from './detalhes-livro.page';

describe('DetalhesLivroPage', () => {
  let component: DetalhesLivroPage;
  let fixture: ComponentFixture<DetalhesLivroPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DetalhesLivroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
