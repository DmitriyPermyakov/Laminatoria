using Laminatoria.Models;

namespace Laminatoria.DTO
{
    public class OrdersResponse
    {
        public List<Order> Orders { get; set; }
        public int TotalCount { get; set; }
    }
}
