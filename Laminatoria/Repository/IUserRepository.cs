using Laminatoria.Models;

namespace Laminatoria.Repository
{
    public interface IUserRepository
    {
        public Task<User> GetByIdAsync(short id);
        public Task<User> GetFirstUserAsync();
        public Task<User> GetByEmailAsync(string email);
        public Task UpdateAsync(User user);
    }
}
