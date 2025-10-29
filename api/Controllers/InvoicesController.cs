using api.Data;
using api.Models;
using InvoiceAPI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace InvoiceAPI.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class InvoicesController : ControllerBase
	{
		private readonly AppDbContext _context;
		private readonly InvoiceService _service;

		public InvoicesController(AppDbContext context, InvoiceService service)
		{
			_context = context;
			_service = service;
		}

		[HttpGet]
		public async Task<IActionResult> GetAll()
		{
			var invoices = await _context.Invoices.Include(i => i.Items).ToListAsync();
			return Ok(invoices);
		}

		[HttpGet("{id}")]
		public async Task<IActionResult> Get(int id)
		{
			var invoice = await _context.Invoices.Include(i => i.Items).FirstOrDefaultAsync(i => i.Id == id);
			if (invoice == null) return NotFound();
			return Ok(invoice);
		}

		[HttpPost]
		public async Task<IActionResult> Create([FromBody] InvoiceHDR invoice)
		{
			try
			{
				var result = await _service.SaveInvoiceAsync(invoice);
				return Ok(result);
			}
			catch (Exception ex)
			{
				return BadRequest(new { message = ex.Message });
			}
		}

		[HttpPut("{id}")]
		public async Task<IActionResult> Update(int id, [FromBody] InvoiceHDR invoice)
		{
			try
			{
				var result = await _service.SaveInvoiceAsync(invoice);
				return Ok(result);
			}
			catch (Exception ex)
			{
				return BadRequest(new { message = ex.Message });
			}
		}


		[HttpDelete("{id}")]
		public async Task<IActionResult> Delete(int id)
		{
			var invoice = await _context.Invoices.FindAsync(id);
			if (invoice == null) return NotFound();

			_context.Invoices.Remove(invoice);
			await _context.SaveChangesAsync();
			return Ok();
		}
	}
}
