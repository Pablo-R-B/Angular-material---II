import { Component } from '@angular/core';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatInput} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatButton} from '@angular/material/button';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';

interface Student {
  name: string;
  grade: number;
  status: string;
}

@Component({
  selector: 'app-notas',
  standalone: true,
  imports: [
    MatFormField,
    FormsModule,
    MatInput, MatFormField, MatLabel, MatSelect, MatOption, MatButton, MatTable, MatColumnDef, MatHeaderCell, MatCell, MatHeaderCellDef, MatCellDef, MatHeaderRow, MatRow, MatRowDef, MatHeaderRowDef
  ],
  templateUrl: './notas.component.html',
  styleUrl: './notas.component.css'
})
export class NotasComponent {
  students: Student[] = [
    {name: 'Juan Pérez', grade: 7, status: 'Aprobado'},
    {name: 'María López', grade: 4, status: 'Suspenso'},
    {name: 'Luis Ramírez', grade: 8, status: 'Aprobado'},
    {name: 'Ana Gómez', grade: 3, status: 'Suspenso'}
  ];

  displayedColumns: string[] = ['name', 'grade', 'status'];
  filterName: string = '';
  filterStatus: string = '';

  get filteredStudents(): Student[] {
    return this.students.filter(student => {
      const matchesName = student.name.toLowerCase().includes(this.filterName.toLowerCase());
      const matchesStatus = this.filterStatus === '' || student.status === this.filterStatus;
      return matchesName && matchesStatus;
    });

  }

  addStudent() {
    const newStudent: Student = {
      name: 'Nuevo estudiante',
      grade: Math.floor(Math.random() * 10) + 1,
      status: ''
    };
    newStudent.status = newStudent.grade >= 5 ? 'Aprobado' : 'Suspenso';
    this.students.push(newStudent);
  }
}
