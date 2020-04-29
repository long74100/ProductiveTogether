using Contracts;
using Entities;
using Entities.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

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

        public IEnumerable<Goal> GetAllGoals()
        {
            return FindAll().ToList();
        }

        public Goal GetGoalById(Guid goalId)
        {
            return FindByCondition(goal => goal.Id.Equals(goalId))
                .FirstOrDefault();
        }

        public Goal GetGoalWithTasks(Guid goalId)
        {
            return FindByCondition(goal => goal.Id.Equals(goalId))
                .Include(g => g.Tasks)
                .FirstOrDefault();
        }
    }
}
