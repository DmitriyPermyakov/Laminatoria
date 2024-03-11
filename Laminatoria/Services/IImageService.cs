namespace Laminatoria.Services
{
    public interface IImageService
    {
        Task<string> UploadImageAsync(IFormFile file);
        Task RemoveImageAsync(string path);
        Task RemoveAllImagesAsync(string[] images);
    }
}
