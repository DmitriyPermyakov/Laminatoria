namespace Laminatoria.Models
{
    public class RefreshToken
    {
        public short Id { get; set; }
        public string Token { get; set; }
        public short UserId { get; set; }
        public User? User { get; set; }
    }
}
