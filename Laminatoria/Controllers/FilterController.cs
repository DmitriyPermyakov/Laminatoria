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
        public IActionResult GetFiltersAsync()
        {
            try
            {
                Filter filters = this.repository.GetFilter();
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
