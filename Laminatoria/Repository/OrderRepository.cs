

using Laminatoria.Models;

namespace Laminatoria.Repository
{
    public class OrderRepository : IOrderRepository
    {
        private LaminatoriaDbContext context;
        public OrderRepository(LaminatoriaDbContext context)
        {
            this.context = context;
        }
        public Task<int> CreateOrderAsync(Order order)
        {
            throw new NotImplementedException();
        }

        public void DeleteOrder(int id)
        {
            throw new NotImplementedException();
        }

        public IQueryable<Order> GetAllOrders()
        {
            return this.context.Orders;
        }

        public Task<Order> GetOrderByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task UpdateOrderAsync(Order order)
        {
            throw new NotImplementedException();
        }
    }
}
