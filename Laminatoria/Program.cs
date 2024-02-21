using Laminatoria.Infrastructure;
using Laminatoria.JwtSettings;
using Laminatoria.Repository;
using Laminatoria.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

JwtSettings jwtSetting = new JwtSettings();

var config = builder.Configuration;
config.GetSection("JwtSettings").Bind(jwtSetting);
builder.Services.AddSingleton(jwtSetting);
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
            policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
        });
});


builder.Services.AddTransient<IOrderRepository, OrderRepository>();
builder.Services.AddTransient<IProductRepository, ProductRepository>();
builder.Services.AddTransient<ICategoryRepository, CategoriesRepository>();
builder.Services.AddTransient<IPasswordHashed, PasswordHashed>();
builder.Services.AddTransient<ITokenGenerator, TokenGenerator>();
builder.Services.AddTransient<ITokenRepository, TokenRepository>();
builder.Services.AddTransient<IAccountService, AccountService>();
builder.Services.AddTransient<IUserRepository, UserRepository>();
builder.Services.AddTransient<IImageService, ImageService>();


TokenValidationParameters tokenValidationParameters = new TokenValidationParametersFactory(jwtSetting).AccessTokenValidationParamaters;
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        //change in production
        options.RequireHttpsMetadata = true;
        options.SaveToken = false;
        options.TokenValidationParameters = tokenValidationParameters;
    });


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
app.UseRouting();

app.UseCors(localOrigins);

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();




app.Run();
