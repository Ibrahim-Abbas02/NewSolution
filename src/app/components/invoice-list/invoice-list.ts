import { Component, OnInit } from '@angular/core';
import { InvoiceService, InvoiceHDR } from '../../services/invoice-service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-invoice-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './invoice-list.html',
  styleUrls: ['./invoice-list.css'],
})
export class InvoiceListComponent implements OnInit {
  invoices: InvoiceHDR[] = [];

  constructor(private invoiceService: InvoiceService, private router: Router) {}

  ngOnInit(): void {
    this.loadInvoices();
  }

  loadInvoices(): void {
    this.invoiceService.getInvoices().subscribe(data => this.invoices = data);
  }

  editInvoice(id: number): void {
    this.router.navigate(['/invoice-form', id]);
  }

  deleteInvoice(id: number): void {
    if(confirm("Are you sure you want to delete this invoice?")) {
      this.invoiceService.deleteInvoice(id).subscribe(() => this.loadInvoices());
    }
  }

  createInvoice(): void {
    this.router.navigate(['/invoice-form']);
  }
}
