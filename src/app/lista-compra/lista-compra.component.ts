import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

interface Product {
  name: string;
  price: number;
  quantity: number;
  total: number;
}

let NgIf;

@Component({
  selector: 'app-lista-compra',
  standalone: true,
  imports: [CommonModule,
    MatFormFieldModule, MatFormFieldModule,MatInputModule, MatListModule, MatButtonModule, FormsModule ],
  templateUrl: './lista-compra.component.html',
  styleUrl: './lista-compra.component.css'
})
export class ListaCompraComponent {
  productName = '';
  productPrice: number | null = null;
  productQuantity: number | null = null;
  products: Product[] = [];
  totalPurchase = 0;

  addProduct() {
    if (this.productName && this.productPrice != null && this.productQuantity != null) {
      const productTotal = this.productPrice * this.productQuantity;
      const newProduct: Product = {
        name: this.productName,
        price: this.productPrice,
        quantity: this.productQuantity,
        total: productTotal
      };

      this.products.push(newProduct);
      this.totalPurchase += productTotal;
      this.resetFields();
    }
  }

  resetFields() {
    this.productName = '';
    this.productPrice = null;
    this.productQuantity = null;
  }

  resetForm() {
    this.products = [];
    this.totalPurchase = 0;
    this.resetFields();
  }

}
