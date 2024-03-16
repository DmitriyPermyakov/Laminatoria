using Laminatoria.Infrastructure;
using Laminatoria.Repository;
using Microsoft.AspNetCore.Mvc;

namespace Laminatoria.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilterController : ControllerBase
    {
        private IFilterRepository repository;

        public FilterController(IFilterRepository repository) 
        {
            this.repository = repository;
        }

        [HttpGet("getProductFilters")]
        public IActionResult GetFiltersAsync(string category)
        {
            try
            {
                Filter filters;
                
                if(string.IsNullOrEmpty(category))
                {
                    return BadRequest("Can't get filters");
                }
                else
                {
                    filters = this.repository.GetProductFilter(category);
                }

                if (filters == null)
                {
                    return BadRequest("Can't get filters");
                }

                return Ok(filters);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getOrderFilters")]
        public IActionResult GetOrdersFilters()
        {
            try
            {
                Filter filters = this.repository.GetOrderFilter();
                if(filters == null)
                {
                    return BadRequest("Can't get filters");
                }
                return Ok(filters);

            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
