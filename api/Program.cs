using api.Data;
using InvoiceAPI.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
	options.AddPolicy("AllowAngular",
		policy =>
		{
			policy.WithOrigins("http://localhost:4200")
				  .AllowAnyHeader()
				  .AllowAnyMethod();
		});
});


builder.Logging.ClearProviders(); 
builder.Logging.AddConsole();

builder.Services.AddControllers();

builder.Services.AddDbContext<AppDbContext>(opt =>
	opt.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<InvoiceService>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.UseCors("AllowAngular");
app.MapControllers();
app.Run();
