using System;
using System.Collections.Generic;
using System.Text;

namespace Contracts
{
    public interface IRepositoryWrapper
    {
        IGoalRepository Goal { get; }
        IGoalTaskRepository GoalTask { get; }
        void Save();
    }
}
