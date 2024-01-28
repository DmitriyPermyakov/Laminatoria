namespace Laminatoria.Models
{
    public class Category
    {
        public short Id { get; set; }
        public string? Name { get; set; }
        public List<Product> Products { get; set; } = new List<Product>();
    }
}
