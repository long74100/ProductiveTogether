using Contracts;
using Entities;
using Entities.Models;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public class RepositoryWrapper : IRepositoryWrapper
    {
        private readonly RepositoryContext _repositoryContext;
        private readonly UserManager<User> _userManager;
        private IGoalRepository _goal;
        private IGoalTaskRepository _goalTask;
        private IUserRepository _user;
        private ITokenRepository _token;

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

        public IGoalTaskRepository GoalTask
        {
            get
            {
                if (_goalTask == null)
                {
                    _goalTask = new GoalTaskRepository(_repositoryContext);
                }

                return _goalTask;
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


        public async Task SaveAsync()
        {
            await _repositoryContext.SaveChangesAsync();
        }
    }
}
