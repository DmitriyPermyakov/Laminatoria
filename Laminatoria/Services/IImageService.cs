namespace Laminatoria.Services
{
    public interface IImageService
    {
        Task<string> UploadImage(IFormFile file);
        Task RemoveImage(string path);
    }
}
