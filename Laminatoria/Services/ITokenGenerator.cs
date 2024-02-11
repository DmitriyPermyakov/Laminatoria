using Laminatoria.Models;
using Microsoft.IdentityModel.Tokens;

namespace Laminatoria.Services
{
    public interface ITokenGenerator
    {
        Task<string> GenerateTokenAsync(TokenType tokenType, User user);
        SecurityToken ValidateToken(string token, TokenValidationParameters tokenValidationParameters);
    }

    public enum TokenType
    {
        AccessToken,
        RefreshToken
    }
}
