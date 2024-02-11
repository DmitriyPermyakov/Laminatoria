using Laminatoria.DTO;

namespace Laminatoria.Services
{
    public interface IAccountService
    {
        public Task<AuthenticationResult> LoginAsync(LoginRequest request);
        public Task Logout(LogoutRequest request);
        public Task<AuthenticationResult> RefreshTokenAsync(string refreshToken);
    }
}
