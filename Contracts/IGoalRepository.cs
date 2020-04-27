using Entities.Models;
using System.Collections;
using System.Collections.Generic;

namespace Contracts
{
    public interface IGoalRepository : IRepositoryBase<Goal>
    {
        IEnumerable<Goal> GetAllGoals();
    }
}
