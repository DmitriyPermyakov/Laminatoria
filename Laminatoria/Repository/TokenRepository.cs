﻿using Laminatoria.Models;
using Microsoft.EntityFrameworkCore;

namespace Laminatoria.Repository
{
    public class TokenRepository : ITokenRepository
    {
        private LaminatoriaDbContext context;
        public TokenRepository(LaminatoriaDbContext context) 
        {
            this.context = context;
        }

        public async Task<List<RefreshToken>> GetAllAsync()
        {
            var tokens =  await this.context.RefreshTokens.ToListAsync();
            return tokens;
        }

        public async Task ClearAsync(List<RefreshToken> tokens)
        {
            this.context.RefreshTokens.RemoveRange(tokens);
            await this.context.SaveChangesAsync();
        }
        public async Task<RefreshToken> CreateAsync(RefreshToken token)
        {
            await this.context.RefreshTokens.AddAsync(token);
            await this.context.SaveChangesAsync();
            return token;
        }

        public async Task<RefreshToken> GetByTokenAsync(string token)
        {
            var tokenFromDb = await this.context.RefreshTokens.FirstOrDefaultAsync(t => t.Token == token);
            return tokenFromDb;
        }

        public async Task RemoveAsync(RefreshToken token)
        {
            this.context.Remove(token);            
            await this.context.SaveChangesAsync();
        }
    }
}
