using Laminatoria.Repository;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    });
builder.Services.AddControllersWithViews();

string connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
ServerVersion serverVersion = new MySqlServerVersion(new Version(8, 3, 0));
builder.Services.AddDbContext<LaminatoriaDbContext>(options => options.UseMySql(connectionString, serverVersion));


string localOrigins = "localOrigin";

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: localOrigins,
        policy =>
        {
            policy.WithOrigins("http://localhost:4200");
        });
});


Console.WriteLine(connectionString);

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

app.UseCors(localOrigins);



app.Run();
