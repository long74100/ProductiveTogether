using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Entities.Models;

namespace Contracts
{
    public interface IGoalRepository : IRepositoryBase<Goal>
    {
        Task<IEnumerable<Goal>> GetAllGoalsAsync();
        Task<Goal> GetGoalByIdAsync(Guid goalId);
        void CreateGoal(Goal goal);
    }
}
