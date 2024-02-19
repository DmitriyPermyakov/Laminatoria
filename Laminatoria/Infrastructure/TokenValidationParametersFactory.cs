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
                    ValidIssuer = jwtSettings.Issuer,

                    ValidateAudience = true,
                    ValidAudience = jwtSettings.Audience,


                    RequireExpirationTime = false,
                    ValidateLifetime = true,

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
                    ValidateIssuer = true,     
                    ValidIssuer = jwtSettings.Issuer,

                    ValidateAudience = true,                    
                    ValidAudience = jwtSettings.Audience,

                    RequireExpirationTime = true,
                    //ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(jwtSettings.RefreshTokenSecret))
                };
            }
        }
    }
}
