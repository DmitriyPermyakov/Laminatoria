namespace Laminatoria.Models
{
    public class AdditionalProperty
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string[] Values { get; set; }
        public Product Product { get; set; }
    }
}
