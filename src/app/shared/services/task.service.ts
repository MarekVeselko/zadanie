import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GET_TASKS_URL } from '../constants/urls';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(GET_TASKS_URL);
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
