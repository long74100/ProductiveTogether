using Contracts;
using Entities;
using Entities.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    class TokenRepository : RepositoryBase<Token>, ITokenRepository
    {
        public TokenRepository(RepositoryContext repositoryContext) : base(repositoryContext)
        {
        }

        public void CreateToken(Token token)
        {
            Create(token);
        }

        public void DeleteToken(Token token)
        {
            Delete(token);
        }

        public async Task<Token> GetTokenByIdAsync(string id)
        {
            return await FindByCondition(t => t.Id.Equals(id)).FirstOrDefaultAsync();
        }
    }
}
