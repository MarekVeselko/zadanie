import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntypedFormControl, FormControl, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Task } from 'src/app/shared/models/task.model';
import { TaskService } from 'src/app/shared/services/task.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewTaskComponent implements OnInit {
  editMode = false;


  readonly controls = {
    name: new FormControl<string | null>(null, Validators.required),
    description: new FormControl<string | null>(null, Validators.required),
    date: new FormControl<Date>(new Date(), Validators.required),
    done: new FormControl<boolean>(false)
  }

  form: FormGroup = new FormGroup(this.controls);

  constructor(private tasksService: TaskService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    if (!this.route.snapshot.params['id']) return;
    const id = this.route.snapshot.params['id'];
    this.editMode = true;
    this.getItem(id);
  }

  getItem(id: string) {
    this.tasksService.getTask(id).subscribe(response => {
      this.controls.name.patchValue(response.name);
      this.controls.description.patchValue(response.description);
      this.controls.done.patchValue(response.done);
      this.controls.date.patchValue(response.expiration);
      this.cdr.markForCheck();
    })
  }

  createTask() {
    const data = {
      name: this.controls.name.value,
      description: this.controls.description.value,
      expiration: this.controls.date.value,
      done: this.controls.done.value,
    }
    this.tasksService.createTask(data).subscribe((response => {
      this.router.navigate(['../home'], { relativeTo: this.route });
    }));
  }

  editTask() {
    const data = {
      name: this.controls.name.value,
      description: this.controls.description.value,
      expiration: this.controls.date.value,
      done: this.controls.done.value,
      id: this.route.snapshot.params['id']
    } as Task;

    this.tasksService.editTask(data).subscribe((response => {
      this.router.navigate(['../../home'], { relativeTo: this.route });
    }));
  }


  onSubmit(): void {
    if (!this.form.valid) return;
    if (!this.editMode) {
      this.createTask();
    } else {
      this.editTask();
    }

  }
}
