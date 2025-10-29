using api.Data;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace InvoiceAPI.Services
{
	public class InvoiceService
	{
		private readonly AppDbContext _context;

		public InvoiceService(AppDbContext context)
		{
			_context = context;
		}

		public async Task<InvoiceHDR> SaveInvoiceAsync(InvoiceHDR invoice)
		{
			if (invoice.InvoiceType == "Cash")
				invoice.VAT = 0;

			decimal subtotal = invoice.Items.Sum(i => i.Quantity * i.UnitPrice);
			invoice.Total = subtotal - invoice.Discount + invoice.VAT;

			if (invoice.InvoiceType == "Credit" && invoice.Total > 10000)
				throw new Exception("Credit invoice cannot exceed 10,000 JD.");

			bool exists = await _context.Invoices.AnyAsync(i => i.InvoiceNo == invoice.InvoiceNo && i.Id != invoice.Id);
			if (exists)
				throw new Exception("Invoice number already exists.");

			if (invoice.Id == 0)
				_context.Invoices.Add(invoice);
			else
				_context.Invoices.Update(invoice);

			await _context.SaveChangesAsync();
			return invoice;
		}
	}
}
