using Laminatoria.Models;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Laminatoria.DTO
{
    public class ProductRequest
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Vendor { get; set; }
        [Required]
        public TypeOfMeasurement TypeOfMeasurement { get; set; }
        [Required]
        public TypeOfProduct TypeOfProduct { get; set; }
        [Required]
        public short? CategoryId { get; set; }       
        public AdditionalProperty AdditionalProperty { get; set; }
        [Required]
        public decimal Price { get; set; }
        public List<Properties> Properties { get; set; } = new List<Properties>();
        //public List<Product> RelatedProducts { get; set; } = new List<Product>();
    }
}
