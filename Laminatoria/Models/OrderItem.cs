namespace Laminatoria.Models
{
    public class OrderItem
    {
        public int Id { get; set; }
        public float Amount { get; set; }
        public string AdditionalPropValue { get; set; }
        public int? ProductId { get; set; }
        public Product? Product { get; set; }
        public int OrderId { get; set; }
        public Order? Order { get; set; }
    }
}
