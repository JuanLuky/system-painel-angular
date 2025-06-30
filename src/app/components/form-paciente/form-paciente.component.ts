import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  ReactiveFormsModule,
  Validators,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { firstValueFrom } from 'rxjs';
import type { Paciente } from '../../interfaces/paciente.modal';
import { AlertMessageComponent } from '../alert-message/alert-message.component';

@Component({
  selector: 'app-form-paciente',
  imports: [CommonModule, ReactiveFormsModule, AlertMessageComponent],
  templateUrl: './form-paciente.component.html',
})
export class FormPacienteComponent {
  showAlert = false;
  errormessage = '';
  sucessMessage = '';

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
      nome: this.form?.value.nome.toUpperCase(), // Força uppercase aqui
      cpf: this.form?.value.cpf.replace(/\D/g, ''), // Remove caracteres não numéricos do CPF
    };

    try {
      const response = await firstValueFrom(
        this.api.cadastrarPaciente(paciente)
      );


      // Sucesso
      this.errormessage = ''; // 🔧 LIMPA MENSAGEM DE ERRO
      this.sucessMessage = 'Paciente cadastrado com sucesso!';
      this.showAlert = true;
      this.form.reset();
      this.timerAlert();
    } catch (error: any) {
      console.error('Erro ao cadastrar paciente:', error);

      this.sucessMessage = ''; // 🔧 LIMPA MENSAGEM DE SUCESSO
      this.showAlert = true;

      if (error.error && error.error.message) {
        this.errormessage = error.error.message;
      } else if (error.message) {
        this.errormessage = error.message;
      } else {
        this.errormessage = 'Erro ao cadastrar paciente.';
      }
      this.form.reset();
      this.timerAlert();
    }
  }

  get nome() {
    return this.form?.get('nome');
  }
  get cpf() {
    return this.form?.get('cpf');
  }

  timerAlert() {
    setTimeout(() => {
      this.showAlert = false;
    }, 2500);
  }

  onBack() {
    this.router.navigate(['/']);
  }
}
