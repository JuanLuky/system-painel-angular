import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { ReactiveFormsModule, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { switchMap, tap, timer } from 'rxjs';
import type { Paciente } from '../../interfaces/paciente.modal';

@Component({
  selector: 'app-form-paciente',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-paciente.component.html',
})
export class FormPacienteComponent {

  showAlert = false;
  alertMessage = 'Paciente cadastrado com sucesso!';

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

    const paciente: Paciente = {
      ...this.form.value,
      nome: this.form.value.nome.toUpperCase() // Força uppercase aqui
    };

    // Aqui você pode fazer o POST para o backend
    this.api.cadastrarPaciente(paciente).pipe(
        tap(() => this.showAlert = true),        // Mostra o alerta
        switchMap(() => timer(1000)),            // Espera 2 segundos
        tap(() => {
          this.showAlert = false;
          this.router.navigate(['/']);           // Redireciona após o tempo
        })
      ).subscribe();
  }

  get nome() {
    return this.form.get('nome');
  }

  onBack() {
    this.router.navigate(['/']);
  }
}
