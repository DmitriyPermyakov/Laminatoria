﻿using Laminatoria.DTO;

namespace Laminatoria.Services
{
    public interface IAccountService
    {
        public Task<AuthenticationResult> LoginAsync(LoginRequest request);
        public Task LogoutAsync();
        public Task<AuthenticationResult> RefreshTokenAsync(string refreshToken);
        public Task ResetPasswordAsync(string email);
        public Task ChangeEmailAsync(string email);
        public Task ChangePasswordAsync(string password);
    }
}
