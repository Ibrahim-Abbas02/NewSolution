import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceService, InvoiceHDR, ItemsDTL } from '../../services/invoice-service';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-invoice-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './invoice-form.html',
  styleUrls: ['./invoice-form.css']
})
export class InvoiceFormComponent implements OnInit {
  invoiceForm!: FormGroup;
  invoiceId?: number;
  errorMsg: string = '';

  constructor(
    private fb: FormBuilder,
    private invoiceService: InvoiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.invoiceId = +this.route.snapshot.paramMap.get('id')!;
    this.initForm();

    if(this.invoiceId) {
      this.invoiceService.getInvoice(this.invoiceId).subscribe(
        inv => this.invoiceForm.patchValue(inv),
        err => this.errorMsg = err.message
      );
    }
  }

  initForm(): void {
    this.invoiceForm = this.fb.group({
      invoiceNo: ['', [Validators.required, Validators.maxLength(20)]],
      customerName: ['', Validators.maxLength(150)],
      invoiceType: ['Cash', Validators.required],
      discount: [0, Validators.min(0)],
      vat: [0, Validators.min(0)],
      items: this.fb.array([])
    });
  }

  get items(): FormArray {
    return this.invoiceForm.get('items') as FormArray;
  }

  addItem(): void {
    this.items.push(this.fb.group({
      itemName: ['', Validators.required],
      quantity: [1, Validators.min(1)],
      unitPrice: [0, Validators.min(0)]
    }));
  }

  removeItem(index: number): void {
    this.items.removeAt(index);
  }

  saveInvoice(): void {
    const invoice: InvoiceHDR = this.invoiceForm.value;

    if(this.invoiceId) {
      this.invoiceService.updateInvoice(this.invoiceId, invoice).subscribe(
        () => this.router.navigate(['/invoice-list']),
        err => this.errorMsg = err.error?.message || err.message
      );
    } else {
      this.invoiceService.createInvoice(invoice).subscribe(
        () => this.router.navigate(['/invoice-list']),
        err => this.errorMsg = err.error?.message || err.message
      );
    }
  }
}
