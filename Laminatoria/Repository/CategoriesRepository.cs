using Laminatoria.Models;

namespace Laminatoria.Repository
{
    public class CategoriesRepository : ICategoryRepository
    {
        private LaminatoriaDbContext context;
        public CategoriesRepository(LaminatoriaDbContext context)
        {
            this.context = context;
        }
        public IEnumerable<Category> GetCategories()
        {
            return context.Categories;
        }
    }
}
