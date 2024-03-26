using Laminatoria.Infrastructure;
using Laminatoria.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Laminatoria.Controllers
{
    [Route("api")]
    [ApiController]
    public class NewClientContactsController : ControllerBase
    {
        [HttpPost("sendContacts")]
        public async Task<IActionResult> SendContacts([FromBody] SendingContacts contacts)
        {
            try
            {
                if(contacts == null || string.IsNullOrEmpty(contacts.Name) || string.IsNullOrEmpty(contacts.Phone))
                {
                    return BadRequest("Empty contacts");
                }

                EmailService emailService = new EmailService();

                await emailService.SendEmail(contacts);
                return Ok();

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
