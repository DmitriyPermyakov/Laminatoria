using Laminatoria.DTO;
using Laminatoria.Models;

namespace Laminatoria.Repository
{
    public interface IProductRepository
    {
        IQueryable<ProductResponse> GetAllProducts(string category);
        Task<ProductResponse> GetProductByIdAsync(int id);
        Task<int> CreateProductAsync(ProductRequest product);
        Task<int> UpdateProductAsync(ProductRequest product);
        void DeleteProduct(int id);
    }

}