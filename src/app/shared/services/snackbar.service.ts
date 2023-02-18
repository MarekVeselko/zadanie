import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private _snackBar: MatSnackBar) { }

  openSnackBar(message: string, type: string) {
    this._snackBar.open(message, 'x', {
      duration: 3000,
      panelClass: 'snackbar-' + type
    });
  }
}


