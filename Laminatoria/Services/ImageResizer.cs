using SkiaSharp;

namespace Laminatoria.Services
{
    public static class ImageResizer
    {
        public static byte[] ResizeImage(byte[] imageBytes, int width, int height)
        {
            SKBitmap img = SKBitmap.Decode(imageBytes);
            double aspectRatio = 0;
            int newHeight = 0;
            int newWidth = 0;

            if(img.Width > img.Height)
            {
                aspectRatio = (double)img.Width / (double)img.Height;
                newHeight = (int)(width / aspectRatio);
                newWidth = width;
            }
            else
            {
                aspectRatio = img.Height / img.Width;
                newWidth = (int)(height / aspectRatio);
                newHeight = height;
            }


            SKImageInfo info = new SKImageInfo(newWidth, newHeight);
            img = img.Resize(info, SKFilterQuality.High);

            using (var ms = new MemoryStream())
            {
                img.Encode(ms, SKEncodedImageFormat.Png, 100);
                return ms.ToArray();
            }
        }
    }
}
