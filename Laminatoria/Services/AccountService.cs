using Laminatoria.DTO;
using Laminatoria.Infrastructure;
using Laminatoria.Models;
using Laminatoria.Repository;
using Microsoft.IdentityModel.Tokens;

namespace Laminatoria.Services
{
    public class AccountService : IAccountService
    {
        private readonly IUserRepository userRepository;
        private readonly IPasswordHashed passwordHashed;
        private readonly ITokenGenerator tokenGenerator;
        private readonly ITokenRepository tokenRepository;
        private readonly JwtSettings.JwtSettings jwtSettings;

        public AccountService(IUserRepository userRepository, IPasswordHashed passwordHashed, ITokenGenerator tokenGenerator, ITokenRepository tokenRepository, JwtSettings.JwtSettings jwtSettings)
        {
            this.userRepository = userRepository;
            this.passwordHashed = passwordHashed;
            this.tokenGenerator = tokenGenerator;
            this.tokenRepository = tokenRepository;
            this.jwtSettings = jwtSettings;
        }
    
        public async Task<AuthenticationResult> LoginAsync(LoginRequest request)
        {
            string accessToken;
            string refreshToken;

            User user =  await userRepository.GetByEmailAsync(request.Email);
            if(user != null &&  passwordHashed.Verify(request.Password, user.PasswordHash)) {
                accessToken = await tokenGenerator.GenerateTokenAsync(TokenType.AccessToken, user);
                refreshToken = await tokenGenerator.GenerateTokenAsync(TokenType.RefreshToken, user);

                List<RefreshToken> refreshTokens = await this.tokenRepository.GetAllAsync();
                await this.tokenRepository.ClearAsync(refreshTokens);

                RefreshToken refToken = new RefreshToken
                {
                    Token = refreshToken,
                    UserId = user.Id,
                };

                await this.tokenRepository.CreateAsync(refToken);

                return new AuthenticationResult
                {
                    AccessToken = accessToken,
                    RefreshToken = refreshToken,
                };
            } else
            {
                return null;
            }
        }

        public async Task LogoutAsync()
        {
            List<RefreshToken> refreshTokens = await this.tokenRepository.GetAllAsync();
            await this.tokenRepository.ClearAsync(refreshTokens);           
        }

        public async Task<AuthenticationResult> RefreshTokenAsync(string refreshToken)
        {
            TokenValidationParameters parameters = new TokenValidationParametersFactory(jwtSettings).RefreshTokenValidationParameters;

            SecurityToken validatedToken = tokenGenerator.ValidateToken(refreshToken, parameters);

            if (validatedToken == null)
                throw new Exception("Invalid token");

            RefreshToken token = await tokenRepository.GetByTokenAsync(refreshToken);
            if (token == null)
                throw new Exception("Token not found");
            
            User user = await userRepository.GetByIdAsync(token.UserId);
            if (user == null)
                throw new Exception("InvalidToken");
            string accessToken = await tokenGenerator.GenerateTokenAsync(TokenType.AccessToken, user);

            return new AuthenticationResult
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken,
            };
        }
    }
}
