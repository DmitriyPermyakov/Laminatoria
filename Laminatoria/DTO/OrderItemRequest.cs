using Laminatoria.Models;

namespace Laminatoria.DTO
{
    public class OrderItemRequest
    {
        public int Id { get; set; }
        public int Amount { get; set; }
        public string AdditionalPropValue { get; set; }
        public int ProductId { get; set; }        
        public int OrderId { get; set; }
        public decimal SumPrice { get; set; }
       
    }
}
