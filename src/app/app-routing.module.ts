import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QuestionaryComponent } from './questionary/questionary.component';
import { UserTemplateComponent } from './user-template/user-template.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path: 'wcpredict', component: LoginComponent},
  // {path: 'wcpredict/login', component: LoginComponent},
  {path: 'wcpredict/register', component: RegisterComponent},
  {path: 'wcpredict/dashboard', component: DashboardComponent, children: [
      {path: '', component: UserTemplateComponent, outlet: 'dashboard'},
      {path: 'predictionPage/:id', component: QuestionaryComponent, outlet: 'dashboard'}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
