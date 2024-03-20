using Binbin.Linq;
using Laminatoria.DTO;
using Laminatoria.Infrastructure;
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
        public IQueryable<MappedProduct> GetAllProducts(string category)
        {
            IQueryable<Product> products = context.Products;

            if (string.IsNullOrEmpty(category))
            {
                return products                    
                    .Include(p => p.Category)
                    .Include(p => p.AdditionalProperty)
                    .Include(p => p.Properties)
                    .Select(p => new MappedProduct
                    {
                        Id = p.Id,
                        Name = p.Name,
                        Vendor = p.Vendor,
                        TypeOfMeasurement = p.TypeOfMeasurement,
                        TypeOfProduct = p.TypeOfProduct,
                        Category = p.Category,
                        Images = p.Images,
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
                   .Select(p => new MappedProduct
                   {
                       Id = p.Id,
                       Name = p.Name,
                       Vendor = p.Vendor,
                       TypeOfMeasurement = p.TypeOfMeasurement,
                       TypeOfProduct = p.TypeOfProduct,
                       Category = p.Category,
                       Images = p.Images,
                       AdditionalProperty = p.AdditionalProperty,
                       Properties = p.Properties,
                       Price = p.Price,
                   });
            }
            
        }

        public async Task<ProductResponse> GetFilteredProductsAsync(Dictionary<string, string> filters)
        {
            Filter filter = FilterQueryParser.ParseFilterQuery(filters);

            var outer = PredicateBuilder.True<Product>();
            outer = outer.And(p => p.Price >= filter.Prices.MinPrice);
            outer = outer.And(p => p.Price <= filter.Prices.MaxPrice);

            if(!string.IsNullOrWhiteSpace(filter.Category))
            {
                outer = outer.And(p => p.Category.Name == filter.Category);
            }

            foreach(var f in filter.Filters)
            {
                var inner = PredicateBuilder.False<Product>();
                foreach(var v in f.Value)
                {
                    inner = inner.Or(p => p.Properties.Select(p => p.Value).Contains(v));
                }

                outer = outer.And(inner);
            }

            var query = context.Products.Where(outer)
                .Include(p => p.Category)
                .Include(p => p.AdditionalProperty)
                .Include(p => p.Properties)
                .Select(p => new MappedProduct
                {
                     Id = p.Id,
                     Name = p.Name,
                     Vendor = p.Vendor,
                     TypeOfMeasurement = p.TypeOfMeasurement,
                     TypeOfProduct = p.TypeOfProduct,
                     Category = p.Category,
                     Images = p.Images,
                     AdditionalProperty = p.AdditionalProperty,
                     Properties = p.Properties,
                     Price = p.Price,
                });

            var total = await query.CountAsync();

            var products = await query.Skip((filter.PaginationInfo.CurrentPage - 1) * filter.PaginationInfo.ElementsOnPage)
                .Take(filter.PaginationInfo.ElementsOnPage).OrderBy(p => p.Name).ToListAsync();

            return new ProductResponse
            {
                Products = products,
                TotalCount = total
            };
        }

        public async Task<MappedProduct> GetProductByIdAsync(int id)
        {
            return await context.Products
                .Include(p => p.Properties)
                .Select(p => new MappedProduct
                {
                    Id = p.Id,
                    Name = p.Name,
                    Vendor = p.Vendor,
                    TypeOfMeasurement = p.TypeOfMeasurement,
                    TypeOfProduct = p.TypeOfProduct,
                    Category = p.Category,
                    Images = p.Images,
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
                Images = newProduct.Images,
                Price = newProduct.Price,
            };
            await context.Products.AddAsync(product);

            if(newProduct.AdditionalProperty.Values.Length > 0) 
            {
                AdditionalProperty additionalProperty = new AdditionalProperty
                {
                    Id = 0,
                    Name = newProduct.AdditionalProperty.Name,
                    Values = newProduct.AdditionalProperty.Values,
                    Product = product
                };

                await context.AddAsync(additionalProperty);
            }

            


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
            Product originalProduct = await context.Products.Where(p => p.Id == product.Id).Include(p => p.Properties).FirstOrDefaultAsync();

            if (originalProduct != null)
            {
                
                originalProduct.Name = product.Name;
                originalProduct.Vendor = product.Vendor;
                originalProduct.TypeOfMeasurement = product.TypeOfMeasurement;
                originalProduct.TypeOfProduct = product.TypeOfProduct;
                originalProduct.Price = product.Price;
                originalProduct.Images = product.Images;
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
