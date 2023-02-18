import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Task } from '../shared/models/task.model';
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

  constructor(private tasksService: TaskService,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getItems();
  }

  getItems(): void {
    this.tasksService.getTasks().subscribe(response => {
      this.dataSource = (response || []);
      this.cdr.markForCheck();
    })
  }

  deleteItem(id: string) {
    const dialogRef = this.dialog.open(DeleteTaskModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      this.tasksService.deleteTask(id).subscribe(() => {
        this.getItems();
      })
    })
  }

  setItemStatus(item: Task, isDone: boolean) {
    const data = {
      ...item,
      done: isDone
    };

    this.tasksService.editTask(data).subscribe(() => {
      this.getItems();
    })
  }
}
