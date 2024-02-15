using Laminatoria.DTO;
using Laminatoria.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Laminatoria.Controllers
{
    [Route("api")]
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


        [Authorize]
        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            try
            {               
                await accountService.LogoutAsync();
                return Unauthorized("Logged out");
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        
        [HttpPost("refresh")]
        public async Task<IActionResult> RefreshTokenAsync([FromBody] RefreshTokenRequest request)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(request.Token) ||request.Token == "\t")
                    return Unauthorized("Invalid token");

                AuthenticationResult result = await accountService.RefreshTokenAsync(request.Token);
                return Ok(result);
            }
            catch(Exception ex)
            {
                return Unauthorized(ex.Message);
            }
        }

    }
}
