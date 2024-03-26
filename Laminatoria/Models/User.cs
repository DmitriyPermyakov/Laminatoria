namespace Laminatoria.Models
{
    public class User
    {
        public short Id { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public string Phone { get; set; }

    }
}
