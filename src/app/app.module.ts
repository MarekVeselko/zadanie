import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NewTaskComponent } from './home/new-task/new-task.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { LoadingComponent } from './shared/parts/loading/loading.component';
import { LoadingService } from './shared/services/loading.service';
import { LoadingInterceptor } from './shared/interceptors/loading.interceptor';
import { TaskService } from './shared/services/task.service';
import {MatDialogModule} from '@angular/material/dialog';
import { DeleteTaskModalComponent } from './home/delete-task/delete-task.modal';




@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HomeComponent,
    NewTaskComponent,
    LoadingComponent,
    DeleteTaskModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    MatSlideToggleModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    MatDialogModule
  ],
  providers: [TaskService, LoadingService, {
    provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
