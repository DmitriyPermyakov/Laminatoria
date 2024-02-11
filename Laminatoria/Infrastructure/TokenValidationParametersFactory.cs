using Laminatoria.JwtSettings;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace Laminatoria.Infrastructure
{
    public class TokenValidationParametersFactory
    {
        private readonly JwtSettings.JwtSettings jwtSettings;

        public TokenValidationParametersFactory(JwtSettings.JwtSettings jwtSettings)
        {
            this.jwtSettings = jwtSettings;
        }

        public TokenValidationParameters AccessTokenValidationParamaters
        {
            get
            {
                return new TokenValidationParameters
                {
                    //изменить валидации
                    ValidateIssuerSigningKey = true,
                    ValidateIssuer = true,
                    ValidateAudience = true,

                    RequireExpirationTime = false,
                    ValidateLifetime = false,

                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(jwtSettings.AccessTokenSecret))
                };
            }
        }

        public TokenValidationParameters RefreshTokenValidationParameters
        {
            get
            {
                return new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    RequireExpirationTime = false,
                    ValidateLifetime = false,

                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(jwtSettings.RefreshTokenSecret))
                };
            }
        }
    }
}
