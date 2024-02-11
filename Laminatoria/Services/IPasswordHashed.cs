namespace Laminatoria.Services
{
    public interface IPasswordHashed
    {
        public string Hash(string password);
        public bool Verify(string password, string passwordHash);
    }
}
