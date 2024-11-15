import {Component} from '@angular/core';


import {NotasComponent} from './notas/notas.component';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import {ListaCompraComponent} from './lista-compra/lista-compra.component';
import {AgendaComponent} from './agenda/agenda.component';



import { MatTableModule } from '@angular/material/table';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import { MatDialogRef } from '@angular/material/dialog';


import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {GaleriaComponent} from './galeria/galeria.component';
import { MatGridListModule } from '@angular/material/grid-list';
import {CommonModule} from '@angular/common';






export interface Image { url: string; description: string; }
// export interface Contact { id: number; name: string; email: string; phone: string; }

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NotasComponent, FormsModule, MatFormFieldModule, ListaCompraComponent,
    AgendaComponent, MatTableModule, MatPaginatorModule, MatDialogModule,
    MatButtonModule, MatInputModule, ReactiveFormsModule, GaleriaComponent, MatGridListModule,
    CommonModule,

    ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-material';
}
