using Entities.Models;

namespace Contracts
{
    public interface IGoalTaskRepository : IRepositoryBase<GoalTask>
    {
        void CreateGoalTask(GoalTask goalTask);
    }
}
