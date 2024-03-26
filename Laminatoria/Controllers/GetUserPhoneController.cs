using Laminatoria.Models;
using Laminatoria.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Laminatoria.Controllers
{
    [Route("api")]
    [ApiController]
    public class GetUserPhoneController : ControllerBase
    {
        private readonly IUserRepository repository;
        public GetUserPhoneController(IUserRepository repository)
        {
            this.repository = repository;
        }

        [HttpGet("userInfo")]
        public async Task<IActionResult> GetPhoneNumber()
        {
            try
            {
                User user = await this.repository.GetFirstUserAsync();
                if (user == null)
                {
                    return NotFound();
                }

                User emptyUser = new User
                {
                    Email = string.Empty,
                    Id = 0,
                    PasswordHash = string.Empty,
                    Phone = user.Phone
                };

                return Ok(user);
            }
            catch (Exception ex) 
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
