import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PainelSenhaComponent } from './painel-senha.component';

describe('PainelSenhaComponent', () => {
  let component: PainelSenhaComponent;
  let fixture: ComponentFixture<PainelSenhaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PainelSenhaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PainelSenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
