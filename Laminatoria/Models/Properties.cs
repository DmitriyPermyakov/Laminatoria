namespace Laminatoria.Models
{
    public class Properties
    {
        public int Id { get; set; }
        public string Property { get; set; }
        public string Value { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }
    }
}
