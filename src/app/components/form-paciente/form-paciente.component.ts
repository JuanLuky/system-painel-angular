import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { ReactiveFormsModule, Validators, FormBuilder, FormGroup, FormControlName, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { firstValueFrom, switchMap, tap, timer } from 'rxjs';
import type { Paciente } from '../../interfaces/paciente.modal';

@Component({
  selector: 'app-form-paciente',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-paciente.component.html',
})
export class FormPacienteComponent {

  showAlert = false;
  alertMessage = '';

  form: FormGroup = null as any; // Inicializa como null e depois será definido no ngOnInit

  constructor(private router: Router, private api: ApiService) {}

  ngOnInit() {
    this.form = new FormGroup({
      nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
      cpf: new FormControl('', [Validators.required, Validators.maxLength(14)]),
      prioridade: new FormControl(false),
    });
  }

  async onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched(); // Marca todos os campos como tocados para mostrar erros
      return;
    }

    const paciente: Paciente = {
      ...this.form?.value,
      nome: this.form?.value.nome.toUpperCase(),// Força uppercase aqui
      cpf: this.form?.value.cpf.replace(/\D/g, ''), // Remove caracteres não numéricos do CPF
    };

    // Aqui você pode fazer o POST para o backend
    // this.api.cadastrarPaciente(paciente).pipe(
    //     tap(() => this.showAlert = true),
    //           // Mostra o alerta
    //     switchMap(() => timer(1000)),            // Espera 2 segundos
    //     tap(() => {
    //       this.showAlert = false;
    //       this.router.navigate(['/']);           // Redireciona após o tempo
    //     })
    //   ).subscribe();

    try {
      const response = await firstValueFrom(
        this.api.cadastrarPaciente(paciente)
      )

      this.showAlert = true;
      this.alertMessage = 'Paciente cadastrado com sucesso!';


    } catch (error : any) {
      console.error(error.message);
      this.showAlert = true;
      this.alertMessage = error.message || 'Erro ao cadastrar paciente';
    }
  }

  get nome() {
    return this.form?.get('nome');
  }

  onBack() {
    this.router.navigate(['/']);
  }
}
