using Laminatoria.DTO;
using Laminatoria.Models;

namespace Laminatoria.Repository
{
    public interface IProductRepository
    {
        IQueryable<Product> GetAllProducts(string category);
        Task<Product> GetProductByIdAsync(int id);
        Task<int> CreateProductAsync(ProductRequest product);
        void UpdateProduct(Product product);
        void DeleteProduct(int id);
    }

}