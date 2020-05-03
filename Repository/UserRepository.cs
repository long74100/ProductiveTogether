using Contracts;
using Entities;
using Entities.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public class UserRepository : RepositoryBase<User>, IUserRepository
    {
        private readonly UserManager<User> _userManager;
        public UserRepository(RepositoryContext repositoryContext, UserManager<User> userManager) : base(repositoryContext)
        {
            _userManager = userManager;
        }

        public async Task<bool> CheckPasswordAsync(User user, string password)
        {
            return await _userManager.CheckPasswordAsync(user, password);
        }

        public async Task<IEnumerable<User>> GetAllUsersAsync()
        {
            return await FindAll().ToListAsync();
        }

        public async Task<User> GetUserByIdAsync(Guid id)
        {
            return await FindByCondition(u => u.Id.Equals(id)).FirstOrDefaultAsync();
        }

        public async Task<User> GetUserByUsernameAsync(string username)
        {
            return await FindByCondition(u => u.UserName.Equals(username)).FirstOrDefaultAsync();
        }
    }
}
