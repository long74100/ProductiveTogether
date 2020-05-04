using Contracts;
using Entities;
using Entities.FilterModels;
using Entities.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public class GoalRepository : RepositoryBase<Goal>, IGoalRepository
    {
        public GoalRepository(RepositoryContext repositoryContext) : base(repositoryContext)
        {
        }

        public void CreateGoal(Goal goal)
        {
            Create(goal) ;
        }

        public async Task<PagedList<Goal>> GetAllGoalsAsync(GoalParameters goalParameters)
        {
            return await PagedList<Goal>.ToPagedListAsync(FindAll(),
                    goalParameters.Page,
                    goalParameters.PageSize);
        }

        public async Task<Goal> GetGoalByIdAsync(Guid goalId)
        {
            return await FindByCondition(goal => goal.Id.Equals(goalId))
                .Include(g => g.Tasks)
                .FirstOrDefaultAsync();
        }

    }
}
