using Laminatoria.JwtSettings;
using Laminatoria.Models;
using Laminatoria.Repository;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Laminatoria.Services
{
    public class TokenGenerator : ITokenGenerator
    {
        private readonly JwtSettings.JwtSettings jwtSettings;
        private readonly ITokenRepository tokenRepository;

        public TokenGenerator(JwtSettings.JwtSettings jwtSettings, ITokenRepository tokenRepository)
        {
            this.jwtSettings = jwtSettings;
            this.tokenRepository = tokenRepository;
        }

        public async Task<string> GenerateTokenAsync(TokenType tokenType, User user)
        {
            string tokenSecret = null;
            double expTime = 0;

            switch(tokenType)
            {
                case TokenType.AccessToken:
                    tokenSecret = jwtSettings.AccessTokenSecret;
                    expTime = jwtSettings.AccessTokenExpirationMinutes;
                    break;
                case TokenType.RefreshToken:
                    tokenSecret = jwtSettings.RefreshTokenSecret;
                    expTime = jwtSettings.RefreshTokenExpirationMinutes;
                    break;
            }

            SecurityKey key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(tokenSecret));
            SigningCredentials signingCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            List<Claim> claims = new List<Claim>()
            {
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString())
            };

            JwtSecurityToken token = new JwtSecurityToken(
                issuer: jwtSettings.Issuer,
                audience: jwtSettings.Audience,
                claims: claims,
                notBefore: DateTime.UtcNow,
                expires: DateTime.UtcNow.AddMinutes(expTime),
                signingCredentials: signingCredentials);
            
            var createdToken = new JwtSecurityTokenHandler().WriteToken(token);

            if(tokenType == TokenType.RefreshToken)
            {
                RefreshToken refreshToken = new RefreshToken()
                {
                    Token = createdToken,
                    UserId = user.Id,
                };
                await tokenRepository.CreateAsync(refreshToken);
            }

            return createdToken;
        }

        public SecurityToken ValidateToken(string token, TokenValidationParameters tokenValidationParameters)
        {
            var tokenSecirityHandler = new JwtSecurityTokenHandler();
            SecurityToken validatedToken;

            try
            {
                ClaimsPrincipal claimsPrincipal = tokenSecirityHandler.ValidateToken(token, tokenValidationParameters, out validatedToken);
            }
            catch
            {
                validatedToken = null;
            }

            return validatedToken;
        }
    }
}
