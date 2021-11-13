import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Unicorn } from '../../../../shared/models/unicorn.model';

@Component({
  selector: 'app-edit-unicorn',
  templateUrl: './edit-unicorn.component.html',
  styleUrls: ['./edit-unicorn.component.scss'],
})
export class EditUnicornComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public readonly data: { unicorn: Unicorn },
    public readonly dialogRef: MatDialogRef<EditUnicornComponent>
  ) {}

  public save(formValue: { name: string }): void {
    this.dialogRef.close({ ...this.data.unicorn, name: formValue.name });
  }
}
