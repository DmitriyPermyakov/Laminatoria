﻿

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
        public async Task<int> CreateOrderAsync(Order order)
        {
            Order newOrder = new Order
            {
                Id = 0,
                Address = order.Address,
                Comments = order.Comments,
                Date = DateTime.Now,
                Delivery = order.Delivery,
                Summary = order.Summary,                
            };

            await this.context.Orders.AddAsync(newOrder);


            Contact contact = new Contact
            {
                Id = 0,
                Name = order.Contact.Name,
                Email = order.Contact.Email,
                Phone = order.Contact.Phone,
                Order = newOrder
            };

            await context.AddAsync(contact);

            List<OrderItem> items = new List<OrderItem>();
            foreach (var item in order.OrderItems)
            {
                item.Id = 0;
                item.Order = newOrder;                
                items.Add(item);
            }

            await context.AddRangeAsync(items);

            await context.SaveChangesAsync();
            return newOrder.Id;
        }      

        public IQueryable<Order> GetAllOrders()
        {
            return this.context.Orders
                .Include(o => o.Contact)
                .Include(o => o.OrderItems);
        }

        public async Task<Order> GetOrderByIdAsync(int id)
        {
            Order order = await this.context.Orders
                .Include(o => o.Contact)
                .Include(o => o.OrderItems)
                .FirstOrDefaultAsync(o => o.Id == id);
            return order;
        }

        public async Task UpdateOrderAsync(Order order)
        {
            Order originalOrder = await this.context.Orders.FindAsync(order.Id);
            if(originalOrder != null)
            {
                originalOrder.Contact = order.Contact;
                originalOrder.Address = order.Address;
                originalOrder.Comments = order.Comments;
                originalOrder.Date = order.Date;
                originalOrder.Delivery = order.Delivery;
                originalOrder.Summary = order.Summary;
                originalOrder.OrderItems = order.OrderItems;
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
