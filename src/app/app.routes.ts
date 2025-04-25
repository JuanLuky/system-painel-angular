import { Routes } from '@angular/router';
import { CadastroPacienteComponent } from './pages/cadastro-paciente/cadastro-paciente.component';
import { PainelSenhaComponent } from './pages/painel-senha/painel-senha.component';
import { ControleMedicoComponent } from './pages/controle-medico/controle-medico.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'cadastro-paciente', component: CadastroPacienteComponent },
  { path: 'painel-senha', component: PainelSenhaComponent },
  { path: 'controle-medico', component: ControleMedicoComponent },
];
