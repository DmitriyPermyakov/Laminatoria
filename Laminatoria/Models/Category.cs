namespace Laminatoria.Models
{
    public class Category
    {
        public short Id { get; set; }
        public string Name { get; set; }
        public IEnumerable<Product> Products { get; set; }
    }
}
