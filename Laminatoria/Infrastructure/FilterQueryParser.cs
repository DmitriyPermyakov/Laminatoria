namespace Laminatoria.Infrastructure
{
    public static class FilterQueryParser
    {
        public static Filter ParseFilterQuery(Dictionary<string, string> filtersQuery)
        {
            Prices prices = new Prices();
            PaginationInfo pagination = new PaginationInfo();
            Filter filter = new Filter();

            filter.Prices = prices;
            filter.PaginationInfo = pagination;
            filter.Filters = new Dictionary<string, string[]>();

            if(!filtersQuery.ContainsKey("minPrice"))
                prices.MinPrice = 0;
            if(!filtersQuery.ContainsKey("maxPrice"))
                prices.MaxPrice = decimal.MaxValue;

            foreach(var f in filtersQuery)
            {

                switch(f.Key)
                {
                    case "minPrice": 
                        _ = decimal.TryParse(f.Value, out decimal minPrice) ? prices.MinPrice = minPrice : prices.MinPrice = 0;
                        break;
                    case "maxPrice":
                        _ = decimal.TryParse(f.Value, out decimal maxPrice) ? prices.MaxPrice = maxPrice : prices.MaxPrice = decimal.MaxValue;
                        break;
                    case "category":
                        filter.Category = f.Value;
                        break;
                    case "currentPage":
                        _ = int.TryParse(f.Value, out int currentPage) ? pagination.CurrentPage = currentPage : pagination.CurrentPage = 1;
                        break;
                    case "elementsOnPage":
                        _ = int.TryParse(f.Value, out int elementsOnPage) ? pagination.ElementsOnPage = elementsOnPage : pagination.ElementsOnPage = 20;
                        break;
                    default:
                        filter.Filters.Add(f.Key, f.Value.Trim().Split(","));
                        break;
                }

                //if (f.Key == "minPrice")
                //{
                //   _ = decimal.TryParse(f.Value, out decimal result) ? prices.MinPrice = result : prices.MinPrice = 0;
                //    continue;
                   
                //}

                //if(f.Key == "maxPrice")
                //{
                //   _ = decimal.TryParse(f.Value, out decimal result) ? prices.MaxPrice = result : prices.MaxPrice = decimal.MaxValue;
                //    continue;
                //}

                //if(f.Key == "category")
                //{
                //    filter.Category = f.Value;
                //    continue;
                //}

                //filter.Filters.Add(f.Key, f.Value.Trim().Split(","));                    
            }



            return filter;
        }
    }
}
