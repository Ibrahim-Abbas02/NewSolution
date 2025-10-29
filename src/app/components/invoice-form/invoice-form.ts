import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Invoice } from '../../models/invoice.model';
import { InvoiceService } from '../../services/invoice';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-invoice-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatTableModule
  ],
  templateUrl: './invoice-form.html',
})
export class InvoiceFormComponent {
  invoice: Invoice = {
    invoiceNo: '',
    customerName: '',
    invoiceType: 'Cash',
    discount: 0,
    vat: 0,
    items: [{ itemName: '', quantity: 1, unitPrice: 0 }]
  };

  displayedColumns: string[] = ['itemName', 'quantity', 'unitPrice', 'total'];

  constructor(private service: InvoiceService) {}

  saveInvoice() {
    this.service.create(this.invoice).subscribe({
      next: () => alert('Invoice saved successfully!'),
      error: err => alert(err.error.message)
    });
  }
}
