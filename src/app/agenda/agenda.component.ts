import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
// import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { ModalConfirmacionComponent } from '../modal-confirmacion/modal-confirmacion.component';
import {MatIcon} from '@angular/material/icon';


interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
}



@Component({
  selector: 'app-agenda',
  standalone: true,
  imports: [MatTableModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDialogModule,
    MatPaginator, MatPaginatorModule, FormsModule, CommonModule, ReactiveFormsModule, MatIcon
  ],
  templateUrl: './agenda.component.html',
  styleUrl: './agenda.component.css'
})
export class AgendaComponent implements OnInit, AfterViewInit {
  contactForm: FormGroup;
  contacts: Contact[] = [];
  dataSource: MatTableDataSource<Contact>;
  displayedColumns: string[] = ['name', 'email', 'phone', 'actions'];
  isEditing = false;
  currentContactId: number | null = null;
  totalContacts = 0;
  currentPage = 0;
  pageSize = 5;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    this.contactForm = this.createForm();
    this.dataSource = new MatTableDataSource<Contact>();
    // this.dataSource = new MatTableDataSource<Contact>(this.contacts);
  }

  ngOnInit() {
    this.updatePagination();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  createForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required]
    });
  }


  onSubmit() {
    if (this.contactForm.valid) {
      if (this.isEditing && this.currentContactId !== null) {
        const index = this.contacts.findIndex(c => c.id === this.currentContactId);
        if (index !== -1) {
          this.contacts[index] = {
            ...this.contactForm.value,
            id: this.currentContactId
          };
        }
      } else {
        const newContact: Contact = {
          id: Date.now(),
          ...this.contactForm.value
        };
        this.contacts.push(newContact);
      }

      this.updateDataSource();
      this.resetForm();


    }
  }

  editContact(contact: Contact) {
    this.isEditing = true;
    this.currentContactId = contact.id;
    this.contactForm.patchValue({
      name: contact.name,
      email: contact.email,
      phone: contact.phone
    });
  }

  cancelEdit() {
    this.resetForm();
  }

  openDeleteDialog(contact: Contact) {
    const dialogRef = this.dialog.open(ModalConfirmacionComponent, {
      width: '250px',
      data: { name: contact.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteContact(contact);
      }
    });
  }

  deleteContact(contact: Contact) {
    const index = this.contacts.findIndex(c => c.id === contact.id);
    if (index !== -1) {
      this.contacts.splice(index, 1);
      this.updateDataSource();
    }
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updateDataSource();
  }

  private updateDataSource() {
    this.totalContacts = this.contacts.length;
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.dataSource.data = this.contacts.slice(startIndex, endIndex);
    this.updatePagination();
  }

  private updatePagination() {
    if (this.paginator) {
      this.paginator.length = this.totalContacts;
      this.paginator.pageSize = this.pageSize;
      this.paginator.pageIndex = this.currentPage;
    }
  }


  private resetForm() {
    this.contactForm.reset();
    this.isEditing = false;
    this.currentContactId = null;
  }
}


