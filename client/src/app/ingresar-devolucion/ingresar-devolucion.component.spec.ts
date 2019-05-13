import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresarDevolucionComponent } from './ingresar-devolucion.component';

describe('IngresarDevolucionComponent', () => {
  let component: IngresarDevolucionComponent;
  let fixture: ComponentFixture<IngresarDevolucionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngresarDevolucionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresarDevolucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
