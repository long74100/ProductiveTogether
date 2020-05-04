using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Entities.FilterModels;
using Entities.Models;

namespace Contracts
{
    public interface IGoalRepository : IRepositoryBase<Goal>
    {
        Task<PagedList<Goal>> GetAllGoalsAsync(GoalParameters goalParameters);
        Task<Goal> GetGoalByIdAsync(Guid goalId);
        void CreateGoal(Goal goal);
    }
}
