using Laminatoria.Models;

namespace Laminatoria.Repository
{
    public interface ICategoryRepository
    {
        IEnumerable<Category> GetCategories();
    }
}
