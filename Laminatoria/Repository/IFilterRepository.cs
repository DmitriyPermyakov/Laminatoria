using Laminatoria.Infrastructure;

namespace Laminatoria.Repository
{
    public interface IFilterRepository
    {
        public Filter GetProductFilter(string category);
        public Filter GetOrderFilter();
    }
}
