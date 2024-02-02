using Laminatoria.DTO;
using Laminatoria.Models;

namespace Laminatoria.Repository
{
    public interface IOrderRepository
    {
        IQueryable<Order> GetAllOrders();
        Task<Order> GetOrderByIdAsync(int id);
        Task<int> CreateOrderAsync(OrderRequest order);
        Task UpdateOrderAsync(OrderRequest order);
        void DeleteOrder(int id);
    }
}
