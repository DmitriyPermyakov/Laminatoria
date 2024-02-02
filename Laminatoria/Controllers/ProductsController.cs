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
        public async Task<IActionResult> GetAllProductAsync([FromQuery] string? category)
        {
            try
            {
                
                List<ProductResponse> products = await this.repository.GetAllProducts(category).ToListAsync();
                return Ok(products);
            }
            catch (Exception e)
            {
                return NotFound("Products not found");
            }

        }

        [HttpGet("getById/{id}")]
        public async Task<IActionResult> GetProductById(int id)
        {
            try
            {
                ProductResponse p = await this.repository.GetProductByIdAsync(id);
                if (p == null)
                    return NotFound($"Product with id {id} not found");
                return Ok(p);
            }
            catch (Exception e)
            {
                return NotFound(e.Message);
            }
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateProduct([FromBody] ProductRequest product)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(product);
                }

                int createdProductIdTask = await this.repository.CreateProductAsync(product);
                return Ok(createdProductIdTask);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut("update")]
        public async Task<IActionResult> UpdateProduct([FromBody] ProductRequest product)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest("Can't update product");
                }                
                int id = await this.repository.UpdateProductAsync(product);
                return Ok(id);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpDelete("delete/{id}")]
        public IActionResult DeleteProduct(int id)
        {
            try
            {
                this.repository.DeleteProduct(id);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
