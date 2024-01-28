namespace Laminatoria.Models
{
    public class Contact
    {
        public short Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public int? OrderId { get; set; }
        public Order? Order { get; set; }
    }
}
