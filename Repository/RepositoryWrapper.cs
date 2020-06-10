using Contracts;
using Entities;
using Entities.Models;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;

namespace Repository
{
    public class RepositoryWrapper : IRepositoryWrapper
    {
        private readonly RepositoryContext _repositoryContext;
        private readonly UserManager<User> _userManager;
        private IGoalRepository _goal;
        private IActionItemRepository _actionItem;
        private IUserRepository _user;
        private ITokenRepository _token;
        private IRelationshipRepository _relationship;

        public RepositoryWrapper(RepositoryContext repositoryContext, UserManager<User> userManager)
        {
            _repositoryContext = repositoryContext;
            _userManager = userManager;
        }

        public IGoalRepository Goal
        {
            get
            {
                if (_goal == null)
                {
                    _goal = new GoalRepository(_repositoryContext);
                }

                return _goal;
            }
        }

        public IActionItemRepository ActionItem
        {
            get
            {
                if (_actionItem == null)
                {
                    _actionItem = new ActionItemRepository(_repositoryContext);
                }

                return _actionItem;
            }
        }

        public IUserRepository User
        {
            get
            {
                if (_user == null)
                {
                    _user = new UserRepository(_repositoryContext, _userManager);
                }

                return _user;
            }
        }


        public ITokenRepository Token
        {
            get
            {
                if (_token == null)
                {
                    _token = new TokenRepository(_repositoryContext);
                }

                return _token;
            }
        }

        public IRelationshipRepository Relationship
        {
            get
            {
                if (_relationship == null)
                {
                    _relationship = new RelationshipRepository(_repositoryContext);
                }

                return _relationship;
            }
        }

        public async Task SaveAsync()
        {
            await _repositoryContext.SaveChangesAsync();
        }
    }
}
