using Entities.Models;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Contracts
{
    public interface IGoalRepository : IRepositoryBase<Goal>
    {
        Task<IEnumerable<Goal>> GetAllGoalsAsync();
        Task<Goal> GetGoalByIdAsync(Guid goalId);
        Task<Goal> GetGoalWithTasksAsync(Guid goalId);
        void CreateGoal(Goal goal);
    }
}
