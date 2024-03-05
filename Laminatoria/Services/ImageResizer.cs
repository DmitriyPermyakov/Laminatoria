using SkiaSharp;

namespace Laminatoria.Services
{
    public static class ImageResizer
    {
        public static byte[] ResizeImage(byte[] imageBytes, int width, int height)
        {
            SKBitmap img = SKBitmap.Decode(imageBytes);

            SKImageInfo info = new SKImageInfo(width, height);
            img = img.Resize(info, SKFilterQuality.High);

            using (var ms = new MemoryStream())
            {
                img.Encode(ms, SKEncodedImageFormat.Png, 100);
                return ms.ToArray();
            }
        }
    }
}
