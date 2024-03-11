
namespace Laminatoria.Services
{
    public class ImageService : IImageService
    {
        private readonly IWebHostEnvironment env;
        private readonly string imageSegment = "images";
        private readonly string bigImageSegment = "_big_image_";

        public ImageService(IWebHostEnvironment env)
        {
            this.env = env;
        }
        public Task RemoveImageAsync(string imageName)
        {
            string webRootPath = env.WebRootPath;
            string smallImage = Path.Combine(webRootPath, this.imageSegment, imageName);
            string bigImage = Path.Combine(webRootPath, this.imageSegment, string.Concat(this.bigImageSegment, imageName));
            if (File.Exists(smallImage) && File.Exists(bigImage))
            {
                File.Delete(smallImage);
                File.Delete(bigImage);

            }           
            return Task.CompletedTask;
        }

        public Task RemoveAllImagesAsync(string[] images)
        {
            string webRootPath = env.WebRootPath;            

            foreach (string image in images)
            {
                string[] segments = image.Split("/");
                string imageName = segments.Last();
                string bigImagePath = Path.Combine(webRootPath, this.imageSegment, string.Concat(this.bigImageSegment, imageName));
                string smallImagePath = Path.Combine(webRootPath, this.imageSegment, imageName);

                if(File.Exists(smallImagePath))
                {
                    File.Delete(smallImagePath);
                }

                if(File.Exists(bigImagePath))
                {
                    File.Delete(bigImagePath);
                }

            }
            
            return Task.CompletedTask;
        }

        public async Task<string> UploadImageAsync(IFormFile file)
        {
            string webRootPath = env.WebRootPath;
            string uploadDir = Path.Combine(webRootPath, this.imageSegment);

            if(!Directory.Exists(uploadDir)) 
                Directory.CreateDirectory(uploadDir);

            string fileName = Path.GetRandomFileName() + file.FileName;

            string fullPathBigImage = Path.Combine(uploadDir, string.Concat(this.bigImageSegment, fileName));


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

           
            

            string location = $"{ this.imageSegment}/{fileName}";
            return location;

        }

    }
}
