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
                    return BadRequest("Unable to login");
                else
                    return Ok(response);
            }
            catch (Exception ex)
            {
                return Unauthorized(ex.Message);
            }
        }


        [Authorize]
        [HttpGet("logout")]
        public async Task<IActionResult> Logout()
        {
            try
            {               
                await accountService.LogoutAsync();
                return Ok();
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        
        [HttpPost("refresh")]
        public async Task<IActionResult> RefreshTokenAsync([FromBody] RefreshTokenRequest request)
        {
            Console.WriteLine("**************** refresh token *****************");
            try
            {
                if (string.IsNullOrWhiteSpace(request.Token) ||request.Token == "\t")
                    return BadRequest("Invalid token");

                AuthenticationResult result = await accountService.RefreshTokenAsync(request.Token);
                return Ok(result);
            }
            catch(Exception ex)
            {
                return Unauthorized(ex.Message);
            }
        }

        [HttpPost("resetPassword")]
        public async Task<IActionResult> ResetPasswordAsync([FromBody] string email)
        {
            try
            {
                if (string.IsNullOrEmpty(email))
                    return BadRequest("Failed to reset password");
                await this.accountService.ResetPasswordAsync(email);
                return Ok();
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("changeEmail")]
        public async Task<IActionResult> ChangeEmail([FromBody] string email)
        {
            try
            {
                if (string.IsNullOrEmpty(email))
                    return BadRequest("Failed to change email");
                await this.accountService.ChangeEmailAsync(email);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
