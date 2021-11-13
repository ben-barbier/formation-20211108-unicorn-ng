import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private readonly _snackBar: MatSnackBar) {}

  public onError(message: string): void {
    this._snackBar.open(`☠️: ${message}`, 'OK', { duration: 4000 });
  }

  public onSuccess(message: string): void {
    this._snackBar.open(`✅: ${message}`, 'OK', { duration: 4000 });
  }
}
