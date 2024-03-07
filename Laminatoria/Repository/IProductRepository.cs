using Laminatoria.DTO;
using Laminatoria.Models;

namespace Laminatoria.Repository
{
    public interface IProductRepository
    {
        IQueryable<MappedProduct> GetAllProducts(string category);
        Task<ProductResponse> GetFilteredProductsAsync(Dictionary<string, string> filters);
        Task<MappedProduct> GetProductByIdAsync(int id);
        Task<int> CreateProductAsync(ProductRequest product);
        Task<int> UpdateProductAsync(ProductRequest product);
        void DeleteProduct(int id);
    }

}