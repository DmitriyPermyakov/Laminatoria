using Laminatoria.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace Laminatoria.Repository
{
    public class FilterRepository : IFilterRepository
    {
        private LaminatoriaDbContext context;
        public FilterRepository(LaminatoriaDbContext context)
        {
            this.context = context;
        }
        public Filter GetFilter()
        {
            var products = this.context.Products.Include(p => p.Properties);

            decimal minPrice = (decimal)products.Min(p => p.Price);
            decimal maxPrice = (decimal)products.Max(p => p.Price);

            Prices prices = new Prices
            {
                MinPrice = minPrice,
                MaxPrice = maxPrice
            };

            var properties = this.context.Properties.GroupBy(p => p.Property)
                .Select(f => new
                {
                    Name = f.Key,
                    Values = f.Select(p => p.Value)
                });



            Dictionary<string, string[]> filter = new Dictionary<string, string[]>();

            foreach(var prop in properties)
            {
                List<string> values = new List<string>();
                foreach(var v in prop.Values)
                {                    
                    values.Add(v);
                }

                filter.Add(prop.Name, values.ToArray());
            }

            return new Filter
            {
                Category = "",
                Prices = prices,
                Filters = filter
            };
        }
    }
}
