using Laminatoria.DTO;
using Laminatoria.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Laminatoria.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private IAccountService accountService;

        public AccountController(IAccountService accountService)
        {
            this.accountService = accountService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            try
            {
                if(!ModelState.IsValid)
                {
                    return BadRequest(request);
                }

                AuthenticationResult response = await accountService.LoginAsync(request);
                if (response == null)
                    return Unauthorized();
                else
                    return Ok(response);
            }
            catch (Exception ex)
            {
                return Unauthorized(ex.Message);
            }
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout([FromBody] string token)
        {
            try
            {
                Console.WriteLine(token);
                if (string.IsNullOrWhiteSpace(token) || token == "\t")
                    return BadRequest("Invalid token");
                await accountService.LogoutAsync(token);
                return Unauthorized("Logged out");
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("refresh")]
        public async Task<IActionResult> RefreshTokenAsync([FromBody] string token)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(token) || token == "\t")
                    return Unauthorized("Invalid token");

                AuthenticationResult result = await accountService.RefreshTokenAsync(token);
                return Ok(result);
            }
            catch(Exception ex)
            {
                return Unauthorized(ex.Message);
            }
        }

    }
}
