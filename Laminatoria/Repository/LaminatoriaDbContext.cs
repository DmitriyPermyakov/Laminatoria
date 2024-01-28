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
        public LaminatoriaDbContext(DbContextOptions<LaminatoriaDbContext> opts): base(opts)
        {
          
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>()
                .Property(p => p.TypeOfMeasurement)
                .HasConversion<int>();
            modelBuilder.Entity<Product>()
                .Property(p => p.TypeOfProduct)
                .HasConversion<string>();

            Contact contact = new Contact
            {
                Id = 1,
                Name = "Андрей Иванов",
                Email = "andrey@mail.ru",
                Phone = "+79994442233",
            };

            OrderItem item = new OrderItem
            {
                Id = 1,
                AdditionalPropValue = "2.5",
                Amount = 8,
                ProductId = 1,
            };

            List<OrderItem> orderItems = new List<OrderItem>();
            orderItems.Add(item);


            modelBuilder.Entity<Order>()
                .HasData(
                    new Order
                    {
                        Id = 1,
                        Contact = contact,
                        Address = "ул. Новосибирская 23, кв 45",
                        Comments = "slgksag;saj;sf",
                        Date = DateTime.Now,
                        Delivery = "delivery",
                        Summary = 1500,
                        OrderItems = orderItems
                    }
                );

            //modelBuilder.Entity<Product>()
            //    .HasData(
            //         new Product
            //         {
            //             Id = 1,
            //             Name = "Дуб Ривьера",
            //             Vendor = "12 2354 zz",
            //             TypeOfMeasurement = TypeOfMeasurement.RoublesForSquareMeter,
            //             TypeOfProduct = TypeOfProduct.cutting,
            //             CategoryId = 1,                        
            //             Price = 900,                         
            //         }
            //    );

            //modelBuilder.Entity<Category>()
            //    .HasData(
            //        new Category { Id = 1, Name = "Laminat" }
            //    );

            //modelBuilder.Entity<AdditionalProperty>()
            //    .HasData(
            //         new AdditionalProperty { Id = 1, Name = "Ширина", Values = "2 3.5 4", ProductId = 1 }
            //    );
            //modelBuilder.Entity<Properties>()
            //    .HasData(
            //        new Properties() { Id = 1, Property = "Бренд", Value = "Дуб ривьера", ProductId = 1 }
            //    );
        }

    }
}
