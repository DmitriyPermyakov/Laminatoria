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
        public Filter GetProductFilter(string category)
        {
            var products = this.context.Products.Where(p => p.Category.Name == category)?.Include(p => p.Properties);

            if(products.Count() < 1 )
            {
                return new Filter
                {
                    Category = category,
                    Prices = null,
                    Filters = null,
                    PaginationInfo = null
                };
            }

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
                Category = category,
                Prices = prices,
                Filters = filter,
                PaginationInfo = null
                
            };
        }

        public Filter GetOrderFilter()
        {
            var ordersCount = this.context.Orders.Count();

            if(ordersCount < 1)
            {
                return new Filter
                {
                    Category = "Orders",
                    Prices = null,
                    Filters = null,
                    PaginationInfo = null
                };
            }

            decimal maxPrice = (decimal)this.context.Orders.Max(o => o.Summary);
            decimal minPrice = (decimal)this.context.Orders.Min(o => o.Summary);

            Prices prices = new Prices
            {
                MaxPrice = maxPrice,
                MinPrice = minPrice
            };

            Dictionary<string, string[]> filter = new Dictionary<string, string[]>();

            List<string> values = new List<string>();
            
            foreach(var s in Enum.GetNames(typeof(Status)))
            {

                switch (s)
                {
                    case "InProcess":
                        values.Add("В обработке");
                        break;
                    case "InDelivery":
                        values.Add("В доставке");
                        break;
                    case "Paid":
                        values.Add("Оплачен");
                        break;
                    case "Finished":
                        values.Add("Завершен");
                        break;
                    case "Cancelled":
                        values.Add("Отменён");
                        break;

                }
            }

            filter.Add("Статус", values.ToArray());
            return new Filter
            {
                Category = "Orders",
                Prices = prices,
                Filters = filter,
                PaginationInfo = null
            };
        }

        
    }
}
