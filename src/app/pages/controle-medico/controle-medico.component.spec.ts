import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControleMedicoComponent } from './controle-medico.component';

describe('ControleMedicoComponent', () => {
  let component: ControleMedicoComponent;
  let fixture: ComponentFixture<ControleMedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControleMedicoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControleMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
