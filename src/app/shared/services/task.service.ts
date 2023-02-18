import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { GET_TASKS_URL } from '../constants/urls';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) { }

  getTasks(form: FormGroup): Observable<Task[]> {
    let params = new HttpParams();
    if (form.value.status !== 'All' && form.value.status !== null) {
      params = params.set('done', form.value.status === 'Done' ? true : false);
    } else {
      params = params.delete('done');
    }
    if (form.value.search !== '' && form.value.search !== null) {
      params = params.set('name', form.value.search);
    }
    return this.http.get<Task[]>(GET_TASKS_URL, {
      params: params
    });
  }

  getTask(id: string): Observable<Task> {
    return this.http.get<Task>(GET_TASKS_URL + '/' + id);
  }

  deleteTask(id: string): Observable<Task> {
    return this.http.delete<Task>(GET_TASKS_URL + '/' + id);
  }

  editTask(data: Task): Observable<Task> {
    return this.http.put<Task>(GET_TASKS_URL + '/' + data.id, data);
  }

  createTask(data: any): Observable<Task> {
    return this.http.post<Task>(GET_TASKS_URL, data);
  }

}
