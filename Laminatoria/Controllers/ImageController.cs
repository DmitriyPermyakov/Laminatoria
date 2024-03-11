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
                string location = await imageService.UploadImageAsync(file);
                string path = "https://localhost:7164/" + location;
                return Ok(new { url = path });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("removeAllImages")]
        public async Task<IActionResult> RemoveAllImagesAsync([FromQuery] string[] images)
        {           

            try
            {
                await imageService.RemoveAllImagesAsync(images);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }


        [HttpDelete("removeImage/{imageName}")]
        public async Task<IActionResult> RemoveImageAsync(string imageName)
        {
            if (string.IsNullOrEmpty(imageName))
                return BadRequest("Wrong name");

            try
            {
                await imageService.RemoveImageAsync(imageName);
                return Ok();
            }
            catch (Exception ex)
            { 
                return BadRequest(ex.Message);
            }
        }
    }
}
