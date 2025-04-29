import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { ReactiveFormsModule, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-form-paciente',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-paciente.component.html',
})
export class FormPacienteComponent {

  form: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private api: ApiService) {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      prioridade: [false],
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const paciente = this.form.value;
    console.log('Paciente cadastrado:' , paciente);

    // Aqui você pode fazer o POST para o backend

    this.api.cadastrarPaciente(paciente).subscribe();
  }

  get nome() {
    return this.form.get('nome');
  }

  onBack() {
    this.router.navigate(['/']);
  }
}
