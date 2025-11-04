// src/app/services/invoice.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ItemsDTL {
  id?: number;
  invoiceId?: number;
  itemName: string;
  quantity: number;
  unitPrice: number;
  lineTotal?: number;
}

export interface InvoiceHDR {
  id?: number;
  invoiceNo: string;
  customerName: string;
  invoiceType: 'Cash' | 'Credit';
  discount: number;
  vat: number;
  total?: number;
  createdDate?: string;
  items: ItemsDTL[];
}

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private apiUrl = 'http://localhost:5094/api/Invoices';

  constructor(private http: HttpClient) {}

  getInvoices(): Observable<InvoiceHDR[]> {
    return this.http.get<InvoiceHDR[]>(this.apiUrl);
  }

  getInvoice(id: number): Observable<InvoiceHDR> {
    return this.http.get<InvoiceHDR>(`${this.apiUrl}/${id}`);
  }

  createInvoice(invoice: InvoiceHDR): Observable<InvoiceHDR> {
    return this.http.post<InvoiceHDR>(this.apiUrl, invoice);
  }

  updateInvoice(id: number, invoice: InvoiceHDR): Observable<InvoiceHDR> {
    return this.http.put<InvoiceHDR>(`${this.apiUrl}/${id}`, invoice);
  }

  deleteInvoice(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
