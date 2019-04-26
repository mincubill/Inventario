import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerPrestamoComponent } from './ver-prestamo.component';

describe('VerPrestamoComponent', () => {
  let component: VerPrestamoComponent;
  let fixture: ComponentFixture<VerPrestamoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerPrestamoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerPrestamoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
