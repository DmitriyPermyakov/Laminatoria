using Laminatoria.Models;

namespace Laminatoria.Repository
{
    public interface IOrderRepository
    {
        IQueryable<Order> GetAllOrders();
        Task<Order> GetOrderByIdAsync(int id);
        Task<int> CreateOrderAsync(Order order);
        Task UpdateOrderAsync(Order order);
        void DeleteOrder(int id);
    }
}
