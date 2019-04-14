import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuitarProductoComponent } from './quitar-producto.component';

describe('QuitarProductoComponent', () => {
  let component: QuitarProductoComponent;
  let fixture: ComponentFixture<QuitarProductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuitarProductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuitarProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
