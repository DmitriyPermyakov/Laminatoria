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

            double minPrice = (double)products.Min(p => p.Price);
            double maxPrice = (double)products.Max(p => p.Price);

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
                    string[] splittedValues = v.Trim().Split(" ");
                    values.AddRange(splittedValues);
                }

                filter.Add(prop.Name, values.ToArray());
            }

            return new Filter
            {
                Prices = prices,
                Filters = filter
            };
        }
    }
}
