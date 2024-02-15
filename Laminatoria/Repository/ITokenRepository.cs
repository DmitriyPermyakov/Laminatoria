using Laminatoria.Models;

namespace Laminatoria.Repository
{
    public interface ITokenRepository
    {
        public Task<List<RefreshToken>> GetAllAsync();
        public Task ClearAsync(List<RefreshToken> refreshTokens);
        public Task<RefreshToken> CreateAsync(RefreshToken token);
        public Task<RefreshToken> GetByTokenAsync(string token);
        public Task RemoveAsync(RefreshToken refreshTokens);
    }
}
