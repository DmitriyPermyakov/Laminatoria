using Laminatoria.Models;

namespace Laminatoria.DTO
{
    public class ProductResponse
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Vendor { get; set; }
        public TypeOfMeasurement TypeOfMeasurement { get; set; }
        public TypeOfProduct TypeOfProduct { get; set; }
        public Category Category { get; set; }
        public AdditionalProperty AdditionalProperty { get; set; }
        public List<Properties> Properties { get; set; }
        public decimal Price { get; set; }
    }
}
