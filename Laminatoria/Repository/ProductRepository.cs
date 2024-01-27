using Laminatoria.DTO;
using Laminatoria.Models;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using System.Text.Json;


namespace Laminatoria.Repository
{
    public class ProductRepository : IProductRepository
    {
        private LaminatoriaDbContext context;

        public ProductRepository(LaminatoriaDbContext context)
        {
            this.context = context;
        }
        public IQueryable<Product> GetAllProducts(string category)
        {
            return context.Products
                .Where(p => p.Category.Name == category)
                .Include(p => p.Category)
                .Include(p => p.AdditionalProperty)
                .Include(p => p.Properties);      
        }

        public async Task<Product> GetProductByIdAsync(int id)
        {
            return await context.Products                
                .Include(p => p.Properties)
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<int> CreateProductAsync(ProductRequest newProduct)
        {
            Console.WriteLine(JsonSerializer.Serialize(newProduct));

           

            Product product = new Product
            {
                Id = 0,
                Name = newProduct.Name,
                Vendor = newProduct.Vendor,
                TypeOfMeasurement = newProduct.TypeOfMeasurement,
                TypeOfProduct = newProduct.TypeOfProduct,
                CategoryId = newProduct.CategoryId,
                Price = newProduct.Price,
            };
            await context.Products.AddAsync(product);



            AdditionalProperty additionalProperty = new AdditionalProperty
            {
                Id = 0,
                Name = newProduct.AdditionalProperty.Name,
                Values = newProduct.AdditionalProperty.Values,
                Product  = product
            };

            await context.AddAsync(additionalProperty);

            List<Properties> properties = new List<Properties>();
            foreach (var prop in newProduct.Properties)
            {
                prop.Id = 0;
                prop.Product = product;
                properties.Add(prop);
            }

            await context.AddRangeAsync(properties);

            await context.SaveChangesAsync();

            return product.Id;
        }

        public void UpdateProduct(Product product)
        {
            context.Products.Update(product);
            context.SaveChanges();
        }

        public void DeleteProduct(int id)
        {
            Product p = context.Products.Find(id);
            context.Products.Remove(p);
            context.SaveChanges();
        }
    }
}
