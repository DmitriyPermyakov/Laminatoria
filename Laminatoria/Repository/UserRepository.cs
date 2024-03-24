using Laminatoria.Models;
using Microsoft.EntityFrameworkCore;

namespace Laminatoria.Repository
{
    public class UserRepository : IUserRepository
    {
        private LaminatoriaDbContext context;
        public UserRepository(LaminatoriaDbContext context)
        {
            this.context = context;
        }
        public async Task<User> GetByEmailAsync(string email)
        {
            User userFromDb = await context.Users.FirstOrDefaultAsync(u => u.Email == email);
            return userFromDb;
        }

        public async Task<User> GetFirstUserAsync()
        {
            User user = await context.Users.FirstOrDefaultAsync();
            return user;
        }

        public async Task<User> GetByIdAsync(short id)
        {
            User userFromDb = await context.Users.FirstOrDefaultAsync(u => u.Id == id);
            return userFromDb;
        }

        public async Task UpdateAsync(User user)
        {
            User userFromDb = await context.Users.FindAsync(user);
            userFromDb.PasswordHash = user.PasswordHash;

            await context.SaveChangesAsync();
        }
    }
}
