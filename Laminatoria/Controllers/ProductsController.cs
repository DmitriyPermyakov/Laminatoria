using Laminatoria.DTO;
using Laminatoria.Models;
using Laminatoria.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Laminatoria.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private IProductRepository repository;
        public ProductsController(IProductRepository repository)
        {
            this.repository = repository;
        }
        [HttpGet("getAll")]
        public async Task<IActionResult> GetAllProduct([FromQuery] string category)
        {
            try
            {
                List<Product> products = await this.repository.GetAllProducts(category).ToListAsync();
                return Ok(products);
            }
            catch(Exception e)
            {
                return NotFound("Product not found");
            }
        }

        [HttpGet("getById/{id}")]
        public async Task<IActionResult> GetProductById(int id)
        {
            Console.WriteLine(id);
            try
            {
                Product p = await this.repository.GetProductByIdAsync(id);
                return Ok(p);
            }
            catch (Exception e)
            {
                return NotFound("Product not found");
            }
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateProduct([FromBody] ProductRequest product)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    Console.WriteLine("Model state is not valid");
                    return BadRequest(product);
                }
                Console.WriteLine("****model state is valid*****");

                int createdProductIdTask = await this.repository.CreateProductAsync(product);
                return Ok(createdProductIdTask);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
