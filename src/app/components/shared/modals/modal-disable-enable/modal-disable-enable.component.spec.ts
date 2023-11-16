import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDisableEnableComponent } from './modal-disable-enable.component';

describe('ModalDisableEnableComponent', () => {
  let component: ModalDisableEnableComponent;
  let fixture: ComponentFixture<ModalDisableEnableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalDisableEnableComponent]
    });
    fixture = TestBed.createComponent(ModalDisableEnableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
