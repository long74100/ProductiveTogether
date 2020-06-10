using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Contracts
{
    public interface IRepositoryWrapper
    {
        IActionItemRepository ActionItem { get; }
        IGoalRepository Goal { get; }
        IRelationshipRepository Relationship { get; }
        ITokenRepository Token { get; }
        IUserRepository User { get; }
        Task SaveAsync();
    }
}
