export interface Item {
  id?: number;
  itemName: string;
  quantity: number;
  unitPrice: number;
  lineTotal?: number;
}

export interface Invoice {
  id?: number;
  invoiceNo: string;
  customerName: string;
  invoiceType: string;
  discount: number;
  vat: number;
  total?: number;
  createdDate?: string;
  items: Item[];
}
