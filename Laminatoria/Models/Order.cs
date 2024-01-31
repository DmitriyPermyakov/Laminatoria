using System.ComponentModel.DataAnnotations.Schema;

namespace Laminatoria.Models
{
    public class Order
    {
        public int Id { get; set; }
        public Contact? Contacts { get; set; }
        public string Address { get; set; }
        public string Comments { get; set; }
        public DateTime Date { get; set; }
        public string Delivery { get; set; }
        [Column(TypeName = "decimal(9,2")]
        public decimal Summary { get; set; }
        public List<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
    }
}
