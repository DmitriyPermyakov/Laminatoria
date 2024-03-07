using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace Laminatoria.Infrastructure
{
    public class Filter
    {
        public string Category { get; set; }
        public Prices Prices { get; set; }
        public PaginationInfo PaginationInfo { get; set; }
        public Dictionary<string, string[]> Filters { get; set; }
    }
}
