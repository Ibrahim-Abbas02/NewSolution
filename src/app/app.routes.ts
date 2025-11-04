import { Routes } from '@angular/router';
import { InvoiceListComponent } from './components/invoice-list/invoice-list';
import { InvoiceFormComponent } from './components/invoice-form/invoice-form';

export const routes: Routes = [
  { path: '', redirectTo: 'invoice-list', pathMatch: 'full' },
  { path: 'invoice-list', component: InvoiceListComponent },
  { path: 'invoice-form', component: InvoiceFormComponent },
  { path: 'invoice-form/:id', component: InvoiceFormComponent }
];


