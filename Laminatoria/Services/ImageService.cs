
namespace Laminatoria.Services
{
    public class ImageService : IImageService
    {
        private readonly IWebHostEnvironment env;

        public ImageService(IWebHostEnvironment env)
        {
            this.env = env;
        }
        public Task RemoveImage(string imageName)
        {
            string webRootPath = env.WebRootPath;
            string smallImage = Path.Combine(webRootPath, "images", imageName);
            string bigImage = Path.Combine(webRootPath, "images", string.Concat("_big_image_", imageName));
            if (File.Exists(smallImage) && File.Exists(bigImage))
            {
                File.Delete(smallImage);
                File.Delete(bigImage);

                return Task.CompletedTask;
            } else
            {
                throw new Exception("file not exists");
            }            
        }

        public async Task<string> UploadImage(IFormFile file)
        {
            string webRootPath = env.WebRootPath;
            string uploadDir = Path.Combine(webRootPath, "images");

            if(!Directory.Exists(uploadDir)) 
                Directory.CreateDirectory(uploadDir);

            string fileName = Path.GetRandomFileName() + file.FileName;

            string fullPathBigImage = Path.Combine(uploadDir, string.Concat("_big_image_", fileName));


            using(var ms = new MemoryStream())
            {
                await file.CopyToAsync(ms);
                var img = ImageResizer.ResizeImage(ms.ToArray(), 400, 400);

                using(var fileStream = new FileStream(Path.Combine(uploadDir, fileName), FileMode.Create))
                {
                    await fileStream.WriteAsync(img);
                    await fileStream.FlushAsync();
                }    
            }

            using(var stream = new FileStream(fullPathBigImage, FileMode.Create))
            {
                
                await file.CopyToAsync(stream);
                await stream.FlushAsync();
            }

           
            

            string location = $"images/{fileName}";
            return location;

        }

    }
}
