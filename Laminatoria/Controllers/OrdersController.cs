﻿using Laminatoria.Models;
using Laminatoria.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Laminatoria.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private IOrderRepository repository;
        public OrdersController(IOrderRepository repository) 
        {
            this.repository = repository;
        }

        [HttpGet("getAll")]
        public async Task<IActionResult> GetAllOrders()
        {
            try
            {
                var orders = await this.repository.GetAllOrders().ToListAsync();
                return Ok(orders);
            }
            catch(Exception e)
            {
                return NotFound(e.Message);
            }
        }

        [HttpGet("getById/{id}")]
        public async Task<IActionResult> GetOrderById(int id)
        {
            try
            {
                var order = await this.repository.GetOrderByIdAsync(id);
                if (order == null)
                    return NotFound($"Order with id {id} not found");
                return Ok(order);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost("update")]
        public async Task<IActionResult> UpdateOrderAsync([FromBody] Order order)
        {
            try
            {
                await this.repository.UpdateOrderAsync(order);
                return Ok("Order successfully updated");
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateOrder([FromBody] Order order)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(order);

                int id = await this.repository.CreateOrderAsync(order);
                return Ok(id);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpDelete("delete/{id}")]
        public IActionResult DeleteOrder(int id)
        {
            try
            {
                this.repository.DeleteOrder(id);
                return Ok("Order was removed");
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}