import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuitarCategoriaComponent } from './quitar-categoria.component';

describe('QuitarCategoriaComponent', () => {
  let component: QuitarCategoriaComponent;
  let fixture: ComponentFixture<QuitarCategoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuitarCategoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuitarCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
