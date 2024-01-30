using System.ComponentModel.DataAnnotations;

namespace Laminatoria.Models
{
    public class Category
    {
        public short Id { get; set; }
        [Required]
        public string? Name { get; set; }
        [Required]
        public string? Value { get; set; }
        public List<Product> Products { get; set; } = new List<Product>();
    }
}
