

using Laminatoria.DTO;
using Laminatoria.Models;
using Microsoft.EntityFrameworkCore;

namespace Laminatoria.Repository
{
    public class OrderRepository : IOrderRepository
    {
        private LaminatoriaDbContext context;
        public OrderRepository(LaminatoriaDbContext context)
        {
            this.context = context;
        }
        public async Task<int> CreateOrderAsync(OrderRequest order)
        {

            List<OrderItem> items = new List<OrderItem>();
            foreach (var item in order.OrderItems)
            {
                OrderItem orderItem = new OrderItem
                {
                    Id = 0,
                    AdditionalPropValue = item.AdditionalPropValue,
                    Amount = item.Amount,
                    OrderId = item.OrderId,
                    ProductId = item.ProductId,
                };

                items.Add(orderItem);
            }

            

            Order newOrder = new Order
            {
                Id = 0,
                Address = order.Address,
                Comments = order.Comments,
                Date = DateTime.Now,
                Delivery = order.Delivery,
                Summary = order.Summary,                
            };

            newOrder.OrderItems.AddRange(items);

            await this.context.Orders.AddAsync(newOrder);


            Contact contacts = new Contact
            {
                Id = 0,
                Name = order.Contacts.Name,
                Email = order.Contacts.Email,
                Phone = order.Contacts.Phone,
                Order = newOrder
            };

            await context.AddAsync(contacts);

            //List<OrderItemRequest> items = new List<OrderItemRequest>();
            //foreach (var item in order.OrderItems)
            //{
            //    item.Id = 0;
            //    item.Order = newOrder;                
            //    items.Add(item);
            //}

            //await context.AddRangeAsync(items);

            await context.SaveChangesAsync();
            return newOrder.Id;
        }      

        public IQueryable<Order> GetAllOrders()
        {
            return this.context.Orders
                .Include(o => o.Contacts)
                .Include(o => o.OrderItems)
                .ThenInclude(i => i.Product)
                .ThenInclude(p => p.AdditionalProperty);
        }

        public async Task<Order> GetOrderByIdAsync(int id)
        {
            Order order = await this.context.Orders
                .Include(o => o.Contacts)
                .Include(o => o.OrderItems)
                .ThenInclude(i => i.Product)
                .ThenInclude(p => p.AdditionalProperty)
                .FirstOrDefaultAsync(o => o.Id == id);
            return order;
        }

        public async Task UpdateOrderAsync(OrderRequest order)
        {            
            Order originalOrder = await this.context.Orders
                .Include(o => o.Contacts)
                .Include(o => o.OrderItems)
                .FirstOrDefaultAsync(o => o.Id == order.Id);

            if(originalOrder != null)
            {
                context.Entry(originalOrder).CurrentValues.SetValues(order);
                originalOrder.Contacts = order.Contacts;
                foreach(var item in order.OrderItems)
                {
                    var originalItem = originalOrder.OrderItems.FirstOrDefault(i => i.Id == item.Id);
                    if(originalItem == null)
                    {
                        var newOrderItem = new OrderItem
                        {
                            Id = item.Id,
                            Amount = item.Amount,
                            AdditionalPropValue = item.AdditionalPropValue,
                            OrderId = item.OrderId,
                            ProductId = item.ProductId,
                        };
                        originalOrder.OrderItems.Add(newOrderItem);
                    }
                    else
                    {
                        context.Entry(originalItem).CurrentValues.SetValues(item);
                    }
                }

                foreach(var item in originalOrder.OrderItems)
                {
                    if(!order.OrderItems.Any(i => i.Id == item.Id))
                    {
                        context.Remove(item);
                    }
                }
            }

            await this.context.SaveChangesAsync();
        }

        public void DeleteOrder(int id)
        {
            Order order = this.context.Orders.Find(id);
            context.Orders.Remove(order);
            context.SaveChanges();            
        }
    }
}
