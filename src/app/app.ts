import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceFormComponent } from './components/invoice-form/invoice-form';
import { RouterOutlet } from '@angular/router';
import { InvoiceListComponent } from './components/invoice-list/invoice-list';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  title = 'Invoice Management';
}
