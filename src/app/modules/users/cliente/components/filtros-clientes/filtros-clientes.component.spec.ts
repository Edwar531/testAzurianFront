import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrosClientesComponent } from './filtros-clientes.component';

describe('FiltrosClientesComponent', () => {
  let component: FiltrosClientesComponent;
  let fixture: ComponentFixture<FiltrosClientesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FiltrosClientesComponent]
    });
    fixture = TestBed.createComponent(FiltrosClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
