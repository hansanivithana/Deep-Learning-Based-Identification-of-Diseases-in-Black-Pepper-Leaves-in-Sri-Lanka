import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {HelpGuiedComponent} from "./help-guied/help-guied.component";
import {AboutUsComponent} from "./about-us/about-us.component";
import {PredictionComponent} from "./prediction/prediction.component";
import {DiseasesComponent} from "./diseases/diseases.component";
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";
import {ChangePasswordComponent} from "./change-password/change-password.component";

const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgotPassword', component: ForgotPasswordComponent },
  { path: 'changePassword', component: ChangePasswordComponent },
  { path: 'home', component: HomeComponent },
  { path: 'prediction', component: PredictionComponent },
  { path: 'about_us', component: AboutUsComponent },
  { path: 'help', component: HelpGuiedComponent },
  { path: 'diseases/:param', component: DiseasesComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
