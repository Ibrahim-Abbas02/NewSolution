using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore; 

namespace api.Models
{
	public class ItemsDTL
	{
		[Key]
		public int Id { get; set; }

		[ForeignKey("InvoiceHDR")]
		public int InvoiceId { get; set; }

		[MaxLength(100)]
		public string ItemName { get; set; } 

		public int Quantity { get; set; }

		[Precision(10, 2)]
		public decimal UnitPrice { get; set; }

		[NotMapped]
		public decimal LineTotal => Quantity * UnitPrice;
	}
}
