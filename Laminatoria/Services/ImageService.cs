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
            string uploadDir = Path.Combine(webRootPath, "images", imageName);
            if (File.Exists(uploadDir))
            {
                File.Delete(uploadDir);
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

            Console.WriteLine("*********************", fileName);
            string fullPath = Path.Combine(uploadDir, fileName);

            using(var stream = new FileStream(fullPath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
                await stream.FlushAsync();
            }

            string location = $"images/{fileName}";
            return location;

        }

    }
}
