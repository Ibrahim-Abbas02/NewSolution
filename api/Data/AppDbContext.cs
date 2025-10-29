using api.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace api.Data
{
	public class AppDbContext : DbContext
	{
		public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

		public DbSet<InvoiceHDR> Invoices { get; set; }
		public DbSet<ItemsDTL> Items { get; set; }
	}
}
