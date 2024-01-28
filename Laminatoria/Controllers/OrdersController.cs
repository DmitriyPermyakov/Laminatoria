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
    }
}
