import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InvoiceFormComponent } from "./components/invoice-form/invoice-form";
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone : true,
  imports: [RouterOutlet, InvoiceFormComponent,HttpClientModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],

})
export class App {
  protected readonly title = signal('Invoice-UI');
}
