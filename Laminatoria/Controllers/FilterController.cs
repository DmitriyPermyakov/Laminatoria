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

        [HttpGet("getFilters")]
        public IActionResult GetFiltersAsync(string category)
        {
            try
            {
                Filter filters;
                
                if(string.IsNullOrEmpty(category))
                {
                   filters = this.repository.GetFilter("laminate");
                }
                else
                {
                    filters = this.repository.GetFilter(category);
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
    }
}
