import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { catchError, of } from 'rxjs';
import { Task } from '../shared/models/task.model';
import { SnackbarService } from '../shared/services/snackbar.service';
import { TaskService } from '../shared/services/task.service';
import { DeleteTaskModalComponent } from './delete-task/delete-task.modal';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['edit', 'name', 'description', 'status', 'expiration', 'setStatusButton', 'deleteButton'];
  dataSource!: Task[];
  timeout: any = null;

  readonly controls = {
    search: new FormControl<string>(''),
    status: new FormControl<string>('All')
  }

  form: FormGroup = new FormGroup(this.controls);

  constructor(private tasksService: TaskService,
    public dialog: MatDialog,
    private snackbarService: SnackbarService,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getItems();
  }

  getItems(): void {
    this.tasksService.getTasks(this.form).pipe(catchError(err => {
      console.log(err);
      this.snackbarService.openSnackBar('There was an error, refresh a page an try again.', 'error');
      return of(null);
    })).subscribe(response => {
      this.dataSource = (response || []);
      this.cdr.markForCheck();
    })
  }

  search() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.getItems();
    }, 500);
  }

  deleteItem(id: string) {
    const dialogRef = this.dialog.open(DeleteTaskModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      this.tasksService.deleteTask(id).pipe(catchError(err => {
        console.log(err);
        this.snackbarService.openSnackBar('There was an error while deleting task.', 'error');
        return of(null);
      })).subscribe(() => {
        this.snackbarService.openSnackBar('Task deleted successfully', 'success');
        this.getItems();
      })
    })
  }

  setItemStatus(item: Task, isDone: boolean) {
    const data = {
      ...item,
      done: isDone
    };

    this.tasksService.editTask(data).pipe(catchError(err => {
      console.log(err);
      this.snackbarService.openSnackBar('There was an error, refresh a page an try again.', 'error');
      return of(null);
    })).subscribe(() => {
      this.getItems();
    })
  }

  isExpirated(task: Task): boolean {
    return new Date(task.expiration) < new Date();
  }
}
