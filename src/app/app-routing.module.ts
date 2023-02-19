import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewTaskComponent } from './home/new-task/new-task.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'new', component: NewTaskComponent },
  { path: 'edit/:id', component: NewTaskComponent },
  { path: '**', redirectTo: 'home' },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
