namespace Laminatoria.Infrastructure
{
    public static class FilterQueryParser
    {
        public static Filter ParseFilterQuery(Dictionary<string, string> filtersQuery)
        {
            Prices prices = new Prices();
            Filter filter = new Filter();
            filter.Prices = prices;
            filter.Filters = new Dictionary<string, string[]>();

            foreach(var f in filtersQuery)
            {
                if (f.Key == "minPrice")
                {
                   _ = decimal.TryParse(f.Value, out decimal result) ? prices.MinPrice = result : prices.MinPrice = 0;
                    continue;
                   
                }

                if(f.Key == "maxPrice")
                {
                   _ = decimal.TryParse(f.Value, out decimal result) ? prices.MaxPrice = result : prices.MaxPrice = decimal.MaxValue;
                    continue;
                }

                if(f.Key == "category")
                {
                    filter.Category = f.Value;
                    continue;
                }

                filter.Filters.Add(f.Key, f.Value.Trim().Split(","));                    
            }



            return filter;
        }
    }
}
