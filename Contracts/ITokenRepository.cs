using Entities.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Contracts
{
    public interface ITokenRepository : IRepositoryBase<Token>
    {
        Task<Token> GetTokenByIdAsync(string id);
        void CreateToken(Token token);
        void DeleteToken(Token token);
    }
}
