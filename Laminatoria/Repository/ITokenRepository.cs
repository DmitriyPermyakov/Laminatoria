using Laminatoria.Models;

namespace Laminatoria.Repository
{
    public interface ITokenRepository
    {
        public Task<RefreshToken> CreateAsync(RefreshToken token);
        public Task<RefreshToken> GetByTokenAsync(string token);
        public Task RemoveAsync(RefreshToken);
    }
}
