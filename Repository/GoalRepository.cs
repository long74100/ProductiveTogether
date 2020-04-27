using Contracts;
using Entities;
using Entities.Models;
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

        public IEnumerable<Goal> GetAllGoals()
        {
            return FindAll().ToList();
        }
    }
}
