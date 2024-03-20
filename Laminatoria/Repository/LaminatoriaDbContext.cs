using Laminatoria.Infrastructure;
using Laminatoria.Models;
using Microsoft.EntityFrameworkCore;

namespace Laminatoria.Repository
{
    public class LaminatoriaDbContext: DbContext
    {
        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<AdditionalProperty> AdditionalProperties { get; set; }
        public DbSet<Properties> Properties { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }
        public LaminatoriaDbContext(DbContextOptions<LaminatoriaDbContext> opts): base(opts)
        {
          
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<User>()
                .HasData(new User
                {
                    Id = 1,
                    Email = "test@mail.ru",
                    PasswordHash = "$2a$12$MXljV674yDVMbnT7EHwzZe7PIvs/N2aLld.dA9/B1wTNLj.Pu9Pyu"
                });



            modelBuilder.Entity<Product>()
                .Property(p => p.TypeOfMeasurement)
                .HasConversion<byte>();
            modelBuilder.Entity<Product>()
                .Property(p => p.TypeOfProduct)
                .HasConversion<byte>();



            Contact contact = new Contact
            {
                Id = 1,
                Name = "Андрей Иванов",
                Email = "andrey@mail.ru",
                Phone = "+79994442233",
                OrderId = 1,
            };          

            
            OrderItem item = new OrderItem
            {
                Id = 1,
                AdditionalPropValue = "2.5",
                Amount = 8,
                ProductId = 1,
                OrderId = 1,
                SumPrice = 18000
                
            };


            modelBuilder.Entity<Contact>()
                 .HasData(contact);

            modelBuilder.Entity<OrderItem>()
                .HasData(item);

            modelBuilder.Entity<OrderItem>()
                .HasOne(p => p.Product)
                .WithMany()
                .OnDelete(DeleteBehavior.SetNull);


            modelBuilder.Entity<Order>()
                .HasData(
                    new Order
                    {
                        Id = 1,                        
                        Address = "ул. Новосибирская 23, кв 45",
                        Status = Status.InProcess,
                        Comments = "slgksag;saj;sf",
                        Date = DateTime.Now,
                        Delivery = "delivery",
                        Summary = 1500,                       
                    }
                );

            modelBuilder.Entity<Product>()
                .HasData(
                     new Product
                     {
                         Id = 1,
                         Name = "Дуб Ривьера",
                         Vendor = "12 2354 zz",
                         TypeOfMeasurement = TypeOfMeasurement.RoublesForSquareMeter,
                         TypeOfProduct = TypeOfProduct.cutting,
                         Images = "",
                         CategoryId = 1,
                         Price = 900,
                     }
                );


            Category category = new Category
            {
                Id = 1,
                Name = "laminate",
                Value = "Ламинат"
            };

            modelBuilder.Entity<Category>()
                .HasData(category);



            modelBuilder.Entity<AdditionalProperty>()
                .HasData(
                     new AdditionalProperty { Id = 1, Name = "Ширина", Values = "2 3.5 4", ProductId = 1 }
                );
            modelBuilder.Entity<Properties>()
                .HasData(
                    new Properties() { Id = 1, Property = "Бренд", Value = "Дуб ривьера", ProductId = 1 }
                );
        }

    }
}
