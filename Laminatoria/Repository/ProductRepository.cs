using Laminatoria.DTO;
using Laminatoria.Models;
using Microsoft.EntityFrameworkCore;

namespace Laminatoria.Repository
{
    public class ProductRepository : IProductRepository
    {
        private LaminatoriaDbContext context;

        public ProductRepository(LaminatoriaDbContext context)
        {
            this.context = context;
        }
        public IQueryable<ProductResponse> GetAllProducts(string category)
        {
            IQueryable<Product> products = context.Products;

            if (string.IsNullOrEmpty(category))
            {
                return products                    
                    .Include(p => p.Category)
                    .Include(p => p.AdditionalProperty)
                    .Include(p => p.Properties)
                    .Select(p => new ProductResponse
                    {
                        Id = p.Id,
                        Name = p.Name,
                        Vendor = p.Vendor,
                        TypeOfMeasurement = p.TypeOfMeasurement,
                        TypeOfProduct = p.TypeOfProduct,
                        Category = p.Category,
                        AdditionalProperty = p.AdditionalProperty,
                        Properties = p.Properties,
                        Price = p.Price,
                    });
            } else
            {
                return products
                   .Where(p => p.Category.Name == category)
                   .Include(p => p.Category)
                   .Include(p => p.AdditionalProperty)
                   .Include(p => p.Properties)
                   .Select(p => new ProductResponse
                   {
                       Id = p.Id,
                       Name = p.Name,
                       Vendor = p.Vendor,
                       TypeOfMeasurement = p.TypeOfMeasurement,
                       TypeOfProduct = p.TypeOfProduct,
                       Category = p.Category,
                       AdditionalProperty = p.AdditionalProperty,
                       Properties = p.Properties,
                       Price = p.Price,
                   });
            }
            
        }

        public async Task<ProductResponse> GetProductByIdAsync(int id)
        {
            return await context.Products
                .Include(p => p.Properties)
                .Select(p => new ProductResponse
                {
                    Id = p.Id,
                    Name = p.Name,
                    Vendor = p.Vendor,
                    TypeOfMeasurement = p.TypeOfMeasurement,
                    TypeOfProduct = p.TypeOfProduct,
                    Category = p.Category,
                    AdditionalProperty = p.AdditionalProperty,
                    Properties = p.Properties,
                    Price = p.Price,
                })
                .FirstOrDefaultAsync(p => p.Id == id);
        }


        public async Task<int> CreateProductAsync(ProductRequest newProduct)
        {

            Product product = new Product
            {
                Id = 0,
                Name = newProduct.Name,
                Vendor = newProduct.Vendor,
                TypeOfMeasurement = newProduct.TypeOfMeasurement,
                TypeOfProduct = newProduct.TypeOfProduct,
                CategoryId = newProduct.Category.Id,
                Price = newProduct.Price,
            };
            await context.Products.AddAsync(product);

            AdditionalProperty additionalProperty = new AdditionalProperty
            {
                Id = 0,
                Name = newProduct.AdditionalProperty.Name,
                Values = newProduct.AdditionalProperty.Values,
                Product = product
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

        public async Task<int> UpdateProductAsync(ProductRequest product)
        {
            Product originalProduct = context.Products.Find(product.Id);

            if (originalProduct != null)
            {
                originalProduct.Name = product.Name;
                originalProduct.Vendor = product.Vendor;
                originalProduct.TypeOfMeasurement = product.TypeOfMeasurement;
                originalProduct.TypeOfProduct = product.TypeOfProduct;
                originalProduct.Price = product.Price;
                originalProduct.AdditionalProperty = product.AdditionalProperty;
                originalProduct.Properties = product.Properties;
                originalProduct.CategoryId = product.Category.Id;
            }

            await context.SaveChangesAsync();
            return originalProduct.Id;
        }

        public void DeleteProduct(int id)
        {
            Product p = context.Products.Find(id);
            context.Products.Remove(p);
            context.SaveChanges();
        }
    }
}
