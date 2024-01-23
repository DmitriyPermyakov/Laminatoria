using Laminatoria.Repository;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddControllersWithViews();

string connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
ServerVersion serverVersion = new MySqlServerVersion(new Version(8, 3, 0));
builder.Services.AddDbContext<LaminatoriaDbContext>(options => options.UseMySql(connectionString, serverVersion));

builder.Services.AddTransient<IOrderRepository, OrderRepository>();
builder.Services.AddTransient<IProductRepository, ProductRepository>();


// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseAuthorization();

app.MapControllers();

app.Run();
