import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresarPrestamoComponent } from './ingresar-prestamo.component';

describe('IngresarPrestamoComponent', () => {
  let component: IngresarPrestamoComponent;
  let fixture: ComponentFixture<IngresarPrestamoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngresarPrestamoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresarPrestamoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
