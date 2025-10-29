using api.Models;
using Microsoft.EntityFrameworkCore; 
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
	public class InvoiceHDR
	{
		[Key]
		public int Id { get; set; }

		[Required, MaxLength(20)]
		public string InvoiceNo { get; set; } = string.Empty;

		[MaxLength(150)]
		public string CustomerName { get; set; } = string.Empty;

		[MaxLength(10)]
		public string InvoiceType { get; set; } = "Cash";

		[Precision(10, 2)]
		public decimal Discount { get; set; }

		[Precision(10, 2)]
		public decimal VAT { get; set; }

		[Precision(10, 2)]
		public decimal Total { get; set; }

		public DateTime CreatedDate { get; set; } = DateTime.Now;

		[Timestamp]
		public byte[] RowVersion { get; set; }

		public List<ItemsDTL> Items { get; set; } = new();
	}
}
