import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SacarStockComponent } from './sacar-stock.component';

describe('SacarStockComponent', () => {
  let component: SacarStockComponent;
  let fixture: ComponentFixture<SacarStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SacarStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SacarStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
