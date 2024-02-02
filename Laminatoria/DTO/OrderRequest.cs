using Laminatoria.Infrastructure;
using Laminatoria.Models;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;

namespace Laminatoria.DTO
{
    public class OrderRequest
    {
        public int Id { get; set; }
        public Contact Contacts { get; set; }
        public string Address { get; set; }
        public Status Status { get; set; }
        public string Comments { get; set; }
        public DateTime Date { get; set; }
        public string Delivery { get; set; }
        public decimal Summary { get; set; }
        public List<OrderItemRequest> OrderItems { get; set; } = new List<OrderItemRequest>();
    }
}
