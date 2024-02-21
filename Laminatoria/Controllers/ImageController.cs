using Laminatoria.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Laminatoria.Controllers
{
    [Route("api")]
    [ApiController]
    public class ImageController : ControllerBase
    {
        private IImageService imageService;

        public ImageController(IImageService imageService)
        {
            this.imageService = imageService;
        }

        [HttpPost("uploadImage")]
        public async Task<IActionResult> UploadImageAsync(IFormFile file)
        {    
            if(file == null)            
                return BadRequest("File not found in form");            

            try
            {            
                //var file = Request.Form.Files[0];
                string location = await imageService.UploadImage(file);
                string path = "https://localhost:7164/" + location;
                return Ok(new { url = path });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpDelete("removeImage/{imageName}")]
        public async Task<IActionResult> RemoveImage(string imageName)
        {
            if (String.IsNullOrEmpty(imageName))
                return BadRequest("Wrong name");

            Console.WriteLine(imageName);

            try
            {
                await imageService.RemoveImage(imageName);
                return Ok();
            }
            catch (Exception ex)
            { 
                return BadRequest(ex.Message);
            }
        }
    }
}
