import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-modal-confirmacion',
  standalone: true,
  imports: [
    MatDialogClose,
    MatButton,
    MatDialogContent,
    MatDialogTitle,
    MatDialogActions
  ],
  templateUrl: './modal-confirmacion.component.html',
  styleUrl: './modal-confirmacion.component.css'
})
export class ModalConfirmacionComponent {
  constructor( public dialogRef: MatDialogRef<ModalConfirmacionComponent>, @Inject(MAT_DIALOG_DATA) public data: any ) {} onNoClick(): void { this.dialogRef.close(); }

}
