using System.ComponentModel.DataAnnotations;

namespace Laminatoria.Models
{
    public class Product
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Vendor { get; set; }
        public short CategoryId { get; set; }
        public string Category { get; set; }
        public int AdditionalPropertyId { get; set; }
        public AdditionalProperty AdditionalProperty { get; set; }

        public decimal Price { get; set; }
        public List<Properties> Properties { get; set; }
        public List<Product> RelatedProducts { get; set; } = new List<Product>();
    }

    public enum TypeOfMeasurement
    {
        RoublesForSquareMeter,
        RoublesForUnit
    }

    public enum TypeOfProduct
    {
        cutting,
        units
    }
}
