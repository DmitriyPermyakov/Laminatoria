using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace Laminatoria.Infrastructure
{
    public class Filter
    {
        [BindingBehavior(BindingBehavior.Required)]
        public string Category { get; set; }
        [BindingBehavior(BindingBehavior.Optional)]
        public Prices Prices { get; set; }
        [BindingBehavior(BindingBehavior.Optional)]
        public Dictionary<string, string[]> Filters { get; set; }
    }
}
