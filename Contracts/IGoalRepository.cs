using Entities.Models;
using System;
using System.Collections;
using System.Collections.Generic;

namespace Contracts
{
    public interface IGoalRepository : IRepositoryBase<Goal>
    {
        IEnumerable<Goal> GetAllGoals();
        Goal GetGoalById(Guid goalId);
        Goal GetGoalWithTasks(Guid goalId);
        void CreateGoal(Goal goal);
    }
}
