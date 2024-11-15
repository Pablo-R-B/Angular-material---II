import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatFormField} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatGridList, MatGridTile} from '@angular/material/grid-list';



import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';

import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
 import { MatFormFieldModule } from '@angular/material/form-field';
import { Image } from '../app.component';
import {ModalImagenComponent} from '../modal-imagen/modal-imagen.component';



@Component({
  selector: 'app-galeria',
  standalone: true,
  imports: [MatFormField, FormsModule, MatButton, MatGridList, MatGridTile,
    MatInputModule, MatButtonModule, MatGridListModule, MatGridListModule, MatDialogModule, ReactiveFormsModule,
    MatFormFieldModule, CommonModule],
  templateUrl: './galeria.component.html',
  styleUrl: './galeria.component.css'
})
export class GaleriaComponent {
  images: Image[] = [
    {url: 'https://static5.museoreinasofia.es/sites/default/files/obras/DE00050.jpg', description: 'Imagen'},
    {url: 'https://okdiario.com/img/2023/09/20/obras-muy-curiosas-de-pablo-picasso.jpg', description:'Cuadro'},
    {url:'https://ethic.es/wp-content/uploads/2023/04/640px-pablo_picasso_graffiti_.jpg', description:'Foto'}
  ];


  filterDescription: string = ''; newImage: Image = { url: '', description: '' };

  constructor(public dialog: MatDialog) {}

  get filteredImages() { return this.images.filter(image => this.filterDescription ? image.description.toLowerCase().includes(this.filterDescription.toLowerCase()) : true ); }

  addImage() { if (this.newImage.url && this.newImage.description) { this.images.push({ ...this.newImage }); this.newImage = { url: '', description: '' }; } }


  openDialog(image: Image) { this.dialog.open(ModalImagenComponent, { data: { url: image.url, description: image.description, title: 'Imagen Ampliada' } }); }
}
