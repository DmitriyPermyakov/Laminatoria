namespace Laminatoria.JwtSettings
{
    public class JwtSettings
    {
        public string AccessTokenSecret { get; set; }
        public string RefreshTokenSecret { get; set; }
        public int AccessTokenExpirationMinutes { get; set; }
        public int RefreshTokenExpirationMinutes { get;}
        public string Audience { get; set; }
        public string Issuer { get; set; }
    }
}
