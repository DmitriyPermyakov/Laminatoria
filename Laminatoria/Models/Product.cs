using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Laminatoria.Models
{
    public class Product
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Vendor { get; set; }
        public TypeOfMeasurement TypeOfMeasurement { get; set; }
        public TypeOfProduct TypeOfProduct { get; set; }
        public short? CategoryId { get; set; }
        public Category? Category { get; set; }        
        public AdditionalProperty AdditionalProperty { get; set; }

        [Column(TypeName = "decimal(5,2)")]
        public decimal Price { get; set; }
        public List<Properties> Properties { get; set; } = new List<Properties>();
        //public List<Product> RelatedProducts { get; set; } = new List<Product>();
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
